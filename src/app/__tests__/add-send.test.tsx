import { render, screen, userEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import i18n from "@/i18n";
import { useTransactionsStore } from "@/store";
import AddTransactionScreen from "../transactions/add";
import SendTransactionScreen from "../transactions/send";

jest.mock("@/utils/toast");

beforeEach(async () => {
  await i18n.changeLanguage("en");
  useTransactionsStore.setState({
    transactions: [
      {
        refId: "SEED",
        transferDate: "2024-10-15T12:34:56Z",
        recipientName: "John Doe",
        transferName: "Salary",
        amount: 1000,
      },
    ],
    filter: "all",
  });
});

describe("Add money screen", () => {
  it("shows the add form", async () => {
    await render(<AddTransactionScreen />);

    expect(screen.getByText("Add Money")).toBeOnTheScreen();
    expect(screen.getByLabelText("Sender Name")).toBeOnTheScreen();
    expect(screen.getByLabelText("Add money")).toBeOnTheScreen();
  });

  it("records an incoming transaction and opens its detail", async () => {
    await render(<AddTransactionScreen />);

    await userEvent.type(screen.getByLabelText("Sender Name"), "Acme Corp");
    await userEvent.type(screen.getByLabelText("Description"), "Bonus");
    await userEvent.type(screen.getByLabelText("Amount"), "250");
    await userEvent.press(screen.getByLabelText("Add money"));

    const created = useTransactionsStore.getState().transactions.at(-1)!;
    expect(created).toMatchObject({ recipientName: "Acme Corp", amount: 250 });
    expect(router.replace).toHaveBeenCalledWith(
      `/transactions/${created.refId}`,
    );
  });

  it("renders in the selected language", async () => {
    await i18n.changeLanguage("ms");
    await render(<AddTransactionScreen />);

    expect(screen.getByText("Tambah Wang")).toBeOnTheScreen();
  });
});

describe("Send money screen", () => {
  it("shows the send form", async () => {
    await render(<SendTransactionScreen />);

    expect(screen.getByText("Send Money")).toBeOnTheScreen();
    expect(screen.getByLabelText("Recipient Name")).toBeOnTheScreen();
    expect(screen.getByLabelText("Send money")).toBeOnTheScreen();
  });

  it("records an outgoing transaction", async () => {
    await render(<SendTransactionScreen />);

    await userEvent.type(screen.getByLabelText("Recipient Name"), "Landlord");
    await userEvent.type(screen.getByLabelText("Description"), "Rent");
    await userEvent.type(screen.getByLabelText("Amount"), "400");
    await userEvent.press(screen.getByLabelText("Send money"));

    expect(useTransactionsStore.getState().transactions.at(-1)).toMatchObject({
      recipientName: "Landlord",
      amount: -400,
    });
  });

  it("keeps the user on the form when the balance is too low", async () => {
    await render(<SendTransactionScreen />);

    await userEvent.type(screen.getByLabelText("Recipient Name"), "Landlord");
    await userEvent.type(screen.getByLabelText("Description"), "Rent");
    await userEvent.type(screen.getByLabelText("Amount"), "2000");
    await userEvent.press(screen.getByLabelText("Send money"));

    expect(
      screen.getByText(/^Amount exceeds your balance of RM/),
    ).toBeOnTheScreen();
    expect(router.replace).not.toHaveBeenCalled();
    expect(useTransactionsStore.getState().transactions).toHaveLength(1);
  });

  it("renders in the selected language", async () => {
    await i18n.changeLanguage("ms");
    await render(<SendTransactionScreen />);

    expect(screen.getByText("Hantar Wang")).toBeOnTheScreen();
  });
});
