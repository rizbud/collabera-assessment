import { render, screen } from "@testing-library/react-native";

import { MOCK_TRANSACTIONS } from "@/constants/transactions";
import i18n from "@/i18n";
import { useTransactionsStore } from "@/store";
import IndexScreen from "../(home)/index";

beforeEach(async () => {
  await i18n.changeLanguage("en");
  useTransactionsStore.setState({
    transactions: MOCK_TRANSACTIONS,
    filter: "all",
  });
});

describe("Home screen", () => {
  it("shows the balance card, the actions and the recent transactions", async () => {
    await render(<IndexScreen />);

    expect(screen.getByText("Your Balance:")).toBeOnTheScreen();
    expect(screen.getByLabelText("Add")).toBeOnTheScreen();
    expect(screen.getByLabelText("Send")).toBeOnTheScreen();
    expect(screen.getByText("Recent Transactions")).toBeOnTheScreen();
  });

  it("greets the account holder", async () => {
    await render(<IndexScreen />);

    expect(
      screen.getByText(/^Good (morning|afternoon|evening), \w+!$/),
    ).toBeOnTheScreen();
  });

  it("renders in the selected language", async () => {
    await i18n.changeLanguage("ms");
    await render(<IndexScreen />);

    expect(screen.getByText("Baki Anda:")).toBeOnTheScreen();
    expect(screen.getByText("Transaksi Terkini")).toBeOnTheScreen();
  });
});
