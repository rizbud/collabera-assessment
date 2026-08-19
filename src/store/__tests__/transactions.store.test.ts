import { MOCK_TRANSACTIONS } from "@/constants/transactions";
import { calculateBalance } from "@/utils";
import { useTransactionsStore } from "../transactions.store";

const state = () => useTransactionsStore.getState();

beforeEach(() => {
  useTransactionsStore.setState({
    transactions: MOCK_TRANSACTIONS,
    filter: "all",
  });
});

describe("useTransactionsStore", () => {
  it("starts from the seeded transactions with no filter applied", () => {
    expect(state().transactions).toEqual(MOCK_TRANSACTIONS);
    expect(state().filter).toBe("all");
  });

  it("changes the filter", () => {
    state().setFilter("out");

    expect(state().filter).toBe("out");
  });

  it("appends a transaction and stamps its refId and date", () => {
    const before = state().transactions.length;

    const created = state().addTransaction({
      recipientName: "Acme Corp",
      transferName: "Salary",
      amount: 250,
    });

    expect(state().transactions).toHaveLength(before + 1);
    expect(state().transactions.at(-1)).toBe(created);
    expect(created.refId).toMatch(/^[0-9A-Z]{1,6}$/);
    expect(Number.isNaN(Date.parse(created.transferDate))).toBe(false);
  });

  it("returns the created transaction so the caller can open its detail", () => {
    const created = state().addTransaction({
      recipientName: "Acme Corp",
      transferName: "Salary",
      amount: 250,
    });

    expect(state().transactions.find((t) => t.refId === created.refId)).toEqual(
      created,
    );
  });

  it("keeps the sign of the amount, so the balance moves both ways", () => {
    const before = calculateBalance(state().transactions);

    state().addTransaction({
      recipientName: "Acme Corp",
      transferName: "Salary",
      amount: 250,
    });
    state().addTransaction({
      recipientName: "Landlord",
      transferName: "Rent",
      amount: -100,
    });

    expect(calculateBalance(state().transactions)).toBeCloseTo(before + 150, 2);
  });

  it("does not mutate the seeded constant", () => {
    state().addTransaction({
      recipientName: "Acme Corp",
      transferName: "Salary",
      amount: 250,
    });

    expect(MOCK_TRANSACTIONS).toHaveLength(6);
  });

  it("gives each transaction its own refId", () => {
    const refIds = new Set(
      Array.from(
        { length: 20 },
        () =>
          state().addTransaction({
            recipientName: "Acme Corp",
            transferName: "Salary",
            amount: 1,
          }).refId,
      ),
    );

    expect(refIds.size).toBe(20);
  });
});
