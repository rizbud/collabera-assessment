import { render, screen, userEvent } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";
import * as Share from "expo-sharing";

import { MOCK_TRANSACTIONS } from "@/constants/transactions";
import i18n from "@/i18n";
import { useTransactionsStore } from "@/store";
import TransactionDetailScreen from "../transactions/[ref-id]";

const openDetailOf = (refId: string) =>
  jest.mocked(useLocalSearchParams).mockReturnValue({ "ref-id": refId });

beforeEach(async () => {
  await i18n.changeLanguage("en");
  useTransactionsStore.setState({
    transactions: MOCK_TRANSACTIONS,
    filter: "all",
  });
  openDetailOf("123ABC");
});

describe("Transaction detail screen", () => {
  it("shows the transaction named by the route", async () => {
    await render(<TransactionDetailScreen />);

    expect(screen.getByText("Transaction Details")).toBeOnTheScreen();
    expect(screen.getByText("Salary Payment")).toBeOnTheScreen();
    expect(screen.getByText("123ABC")).toBeOnTheScreen();
    expect(screen.getByText("John Doe")).toBeOnTheScreen();
  });

  it("offers to share it", async () => {
    await render(<TransactionDetailScreen />);

    expect(
      screen.getByLabelText("Share transaction details"),
    ).toBeOnTheScreen();
  });

  it("says so when the refId matches nothing, and hides sharing", async () => {
    openDetailOf("NOPE");
    await render(<TransactionDetailScreen />);

    expect(screen.getByText("Transaction not found")).toBeOnTheScreen();
    expect(
      screen.queryByLabelText("Share transaction details"),
    ).not.toBeOnTheScreen();
  });

  it("reports a failed capture rather than sharing nothing", async () => {
    jest.spyOn(console, "error").mockImplementation();
    await render(<TransactionDetailScreen />);

    await userEvent.press(screen.getByLabelText("Share transaction details"));

    expect(Share.shareAsync).not.toHaveBeenCalled();
  });

  it("renders in the selected language", async () => {
    await i18n.changeLanguage("ms");
    await render(<TransactionDetailScreen />);

    expect(screen.getByText("Butiran Transaksi")).toBeOnTheScreen();
    expect(screen.getByText("ID Rujukan")).toBeOnTheScreen();
    expect(screen.getByText("Kongsi")).toBeOnTheScreen();
  });
});
