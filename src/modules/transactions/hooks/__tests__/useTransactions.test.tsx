import { act, renderHook } from "@testing-library/react-native";

import { MOCK_TRANSACTIONS } from "@/constants/transactions";
import i18n from "@/i18n";
import { useTransactionsStore } from "@/store";
import { isMonthHeader } from "@/utils";
import { useTransactions } from "../useTransactions";

const months = (rows: ReturnType<typeof useTransactions>["rows"]) =>
  rows.filter(isMonthHeader).map((header) => header.month);

beforeEach(async () => {
  await i18n.changeLanguage("en");
  useTransactionsStore.setState({
    transactions: MOCK_TRANSACTIONS,
    filter: "all",
  });
});

describe("useTransactions", () => {
  it("returns every transaction grouped by month", async () => {
    const { result } = await renderHook(() => useTransactions());

    expect(result.current.activeFilter).toBe("all");
    expect(months(result.current.rows)).toEqual([
      "October 2024",
      "September 2024",
      "August 2024",
      "July 2024",
    ]);
    expect(
      result.current.rows.filter((row) => !isMonthHeader(row)),
    ).toHaveLength(MOCK_TRANSACTIONS.length);
  });

  it("regroups when the filter changes", async () => {
    const { result } = await renderHook(() => useTransactions());

    await act(() => result.current.setActiveFilter("out"));

    expect(result.current.activeFilter).toBe("out");
    expect(
      result.current.rows.filter((row) => !isMonthHeader(row)),
    ).toHaveLength(2);
    expect(months(result.current.rows)).toEqual([
      "October 2024",
      "August 2024",
    ]);
  });

  it("picks up a newly added transaction", async () => {
    const { result } = await renderHook(() => useTransactions());
    const before = result.current.rows.length;

    await act(() => {
      useTransactionsStore.getState().addTransaction({
        recipientName: "Acme Corp",
        transferName: "Salary",
        amount: 250,
      });
    });

    expect(result.current.rows.length).toBeGreaterThan(before);
  });

  it("relabels the month headers when the language changes", async () => {
    const { result } = await renderHook(() => useTransactions());

    await act(async () => {
      await i18n.changeLanguage("ms");
    });

    expect(months(result.current.rows)).toEqual([
      "Oktober 2024",
      "September 2024",
      "Ogos 2024",
      "Julai 2024",
    ]);
  });

  it("drops the filter when the screen unmounts", async () => {
    const { result, unmount } = await renderHook(() => useTransactions());

    await act(() => result.current.setActiveFilter("in"));
    expect(useTransactionsStore.getState().filter).toBe("in");

    await unmount();

    expect(useTransactionsStore.getState().filter).toBe("all");
  });
});
