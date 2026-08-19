import { render, screen, userEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import { MOCK_TRANSACTIONS } from "@/constants/transactions";
import i18n from "@/i18n";
import { useTransactionsStore } from "@/store";
import { Transactions } from "../transactions";

beforeEach(async () => {
  await i18n.changeLanguage("en");
  useTransactionsStore.setState({
    transactions: MOCK_TRANSACTIONS,
    filter: "all",
  });
});

describe("Transactions (recent)", () => {
  it("lists the five newest transactions, newest first", async () => {
    await render(<Transactions />);

    expect(screen.getByText("Recent Transactions")).toBeOnTheScreen();
    // the seed has six; the oldest (Sarah Wilson, July) is left out
    expect(screen.getByText("John Doe")).toBeOnTheScreen();
    expect(screen.queryByText("Sarah Wilson")).not.toBeOnTheScreen();
  });

  it("goes to the full history from View All", async () => {
    await render(<Transactions />);

    await userEvent.press(screen.getByLabelText("View all transactions"));

    expect(router.push).toHaveBeenCalledWith("/transactions");
  });

  it("shows an empty state when there are no transactions", async () => {
    useTransactionsStore.setState({ transactions: [] });
    await render(<Transactions />);

    expect(screen.getByText("No transactions available")).toBeOnTheScreen();
  });

  it("translates its labels", async () => {
    await i18n.changeLanguage("ms");
    await render(<Transactions />);

    expect(screen.getByText("Transaksi Terkini")).toBeOnTheScreen();
    expect(screen.getByText("Lihat Semua")).toBeOnTheScreen();
  });
});
