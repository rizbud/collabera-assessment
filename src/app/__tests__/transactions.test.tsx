import { render, screen, userEvent } from "@testing-library/react-native";

import { MOCK_TRANSACTIONS } from "@/constants/transactions";
import i18n from "@/i18n";
import { useTransactionsStore } from "@/store";
import TransactionsScreen from "../transactions/index";

beforeEach(async () => {
  await i18n.changeLanguage("en");
  useTransactionsStore.setState({
    transactions: MOCK_TRANSACTIONS,
    filter: "all",
  });
});

describe("Transaction history screen", () => {
  it("lists every transaction grouped by month", async () => {
    await render(<TransactionsScreen />);

    expect(screen.getByText("Transaction History")).toBeOnTheScreen();
    expect(screen.getByText("October 2024")).toBeOnTheScreen();
    expect(screen.getByText("July 2024")).toBeOnTheScreen();
    expect(screen.getByText("Sarah Wilson")).toBeOnTheScreen();
  });

  it("narrows the list to outgoing transactions", async () => {
    await render(<TransactionsScreen />);

    await userEvent.press(screen.getByText("Outgoing"));

    expect(screen.getByText("Robert Brown")).toBeOnTheScreen();
    expect(screen.queryByText("John Doe")).not.toBeOnTheScreen();
    expect(screen.queryByText("July 2024")).not.toBeOnTheScreen();
  });

  it("narrows the list to incoming transactions", async () => {
    await render(<TransactionsScreen />);

    await userEvent.press(screen.getByText("Incoming"));

    expect(screen.getByText("John Doe")).toBeOnTheScreen();
    expect(screen.queryByText("Robert Brown")).not.toBeOnTheScreen();
  });

  it("shows an empty state when a filter matches nothing", async () => {
    useTransactionsStore.setState({
      transactions: MOCK_TRANSACTIONS.filter((t) => t.amount >= 0),
    });
    await render(<TransactionsScreen />);

    await userEvent.press(screen.getByText("Outgoing"));

    expect(screen.getByText("No transactions available")).toBeOnTheScreen();
  });

  it("relabels the months when the language changes", async () => {
    await render(<TransactionsScreen />);

    await userEvent.press(screen.getByLabelText("Switch language to MY"));

    expect(screen.getByText("Sejarah Transaksi")).toBeOnTheScreen();
    expect(screen.getByText("Oktober 2024")).toBeOnTheScreen();
    expect(screen.getByText("Julai 2024")).toBeOnTheScreen();
  });

  it("forgets the filter after leaving the screen", async () => {
    const { unmount } = await render(<TransactionsScreen />);

    await userEvent.press(screen.getByText("Outgoing"));
    expect(useTransactionsStore.getState().filter).toBe("out");

    await unmount();

    expect(useTransactionsStore.getState().filter).toBe("all");
  });
});
