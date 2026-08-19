import { MOCK_TRANSACTIONS } from "@/constants/transactions";
import type { Transactions } from "@/types/transaction.type";
import {
  calculateBalance,
  filterTransactions,
  groupByMonth,
  isMonthHeader,
  sortByDateDesc,
} from "../transactions";

const transactions: Transactions = [
  {
    refId: "A",
    transferDate: "2024-10-15T12:00:00Z",
    recipientName: "John",
    transferName: "Salary",
    amount: 1000,
  },
  {
    refId: "B",
    transferDate: "2024-10-01T12:00:00Z",
    recipientName: "Jane",
    transferName: "Bill",
    amount: -250.5,
  },
  {
    refId: "C",
    transferDate: "2024-09-20T12:00:00Z",
    recipientName: "Bob",
    transferName: "Refund",
    amount: 40,
  },
];

describe("sortByDateDesc", () => {
  it("orders newest first without mutating the input", () => {
    const input = [...transactions].reverse();
    const sorted = sortByDateDesc(input);

    expect(sorted.map((t) => t.refId)).toEqual(["A", "B", "C"]);
    expect(input.map((t) => t.refId)).toEqual(["C", "B", "A"]);
  });
});

describe("filterTransactions", () => {
  it("returns everything for the all filter", () => {
    expect(filterTransactions(transactions, "all")).toBe(transactions);
  });

  it("splits incoming from outgoing", () => {
    expect(filterTransactions(transactions, "in").map((t) => t.refId)).toEqual([
      "A",
      "C",
    ]);
    expect(filterTransactions(transactions, "out").map((t) => t.refId)).toEqual(
      ["B"],
    );
  });

  it("treats a zero amount as incoming", () => {
    const zero = [{ ...transactions[0], refId: "Z", amount: 0 }];

    expect(filterTransactions(zero, "in")).toHaveLength(1);
    expect(filterTransactions(zero, "out")).toHaveLength(0);
  });
});

describe("calculateBalance", () => {
  it("nets incoming against outgoing", () => {
    expect(calculateBalance(transactions)).toBeCloseTo(789.5, 2);
  });

  it("is zero for no transactions", () => {
    expect(calculateBalance([])).toBe(0);
  });
});

describe("groupByMonth", () => {
  it("inserts one header per month, newest first", () => {
    const rows = groupByMonth(transactions);

    expect(rows).toHaveLength(transactions.length + 2);
    expect(rows.filter(isMonthHeader).map((h) => h.month)).toEqual([
      "October 2024",
      "September 2024",
    ]);
    expect(isMonthHeader(rows[0])).toBe(true);
    expect(isMonthHeader(rows[1])).toBe(false);
  });

  it("totals each month, keeping outgoing as a positive magnitude", () => {
    const [october, september] =
      groupByMonth(transactions).filter(isMonthHeader);

    expect(october).toMatchObject({ incoming: 1000, outgoing: 250.5 });
    expect(september).toMatchObject({ incoming: 40, outgoing: 0 });
  });

  it("totals only the rows it is given, so they follow the active filter", () => {
    const rows = groupByMonth(filterTransactions(transactions, "in"));

    expect(rows.filter(isMonthHeader).every((h) => h.outgoing === 0)).toBe(
      true,
    );
  });

  it("returns nothing for no transactions", () => {
    expect(groupByMonth([])).toEqual([]);
  });

  it("groups the seeded transactions by their month", () => {
    const months = groupByMonth(MOCK_TRANSACTIONS)
      .filter(isMonthHeader)
      .map((h) => h.month);

    expect(months).toEqual([
      "October 2024",
      "September 2024",
      "August 2024",
      "July 2024",
    ]);
  });
});

describe("isMonthHeader", () => {
  it("separates headers from transactions", () => {
    expect(
      isMonthHeader({ month: "July 2024", incoming: 0, outgoing: 0 }),
    ).toBe(true);
    expect(isMonthHeader(transactions[0])).toBe(false);
  });
});
