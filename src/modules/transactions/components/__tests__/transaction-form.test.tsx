import { render, screen, userEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import i18n from "@/i18n";
import { useTransactionsStore } from "@/store";
import { toast } from "@/utils";
import { TransactionForm } from "../transaction-form";

jest.mock("@/utils/toast");

const fill = async (values: {
  name?: string;
  description?: string;
  amount?: string;
}) => {
  if (values.name !== undefined) {
    await userEvent.type(screen.getByLabelText(/Name$/), values.name);
  }
  if (values.description !== undefined) {
    await userEvent.type(
      screen.getByLabelText("Description"),
      values.description,
    );
  }
  if (values.amount !== undefined) {
    await userEvent.type(screen.getByLabelText("Amount"), values.amount);
  }
};

beforeEach(async () => {
  await i18n.changeLanguage("en");
  // one incoming transaction, so the balance is a known 1000
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

describe("TransactionForm", () => {
  it("labels the fields for adding money", async () => {
    await render(<TransactionForm type="in" />);

    expect(screen.getByText(/^Available balance: RM/)).toBeOnTheScreen();
    expect(screen.getByLabelText("Sender Name")).toBeOnTheScreen();
    expect(screen.getByLabelText("Description")).toBeOnTheScreen();
    expect(screen.getByLabelText("Amount")).toBeOnTheScreen();
    expect(screen.getByLabelText("Add money")).toBeOnTheScreen();
  });

  it("labels the fields for sending money", async () => {
    await render(<TransactionForm type="out" />);

    expect(screen.getByLabelText("Recipient Name")).toBeOnTheScreen();
    expect(screen.getByLabelText("Send money")).toBeOnTheScreen();
  });

  it("adds an incoming transaction and opens its detail", async () => {
    await render(<TransactionForm type="in" />);

    await fill({ name: "Acme Corp", description: "Salary", amount: "250.50" });
    await userEvent.press(screen.getByLabelText("Add money"));

    expect(useTransactionsStore.getState().transactions.at(-1)).toMatchObject({
      recipientName: "Acme Corp",
      transferName: "Salary",
      amount: 250.5,
    });
    expect(toast).toHaveBeenCalledWith(expect.stringContaining("Added"));
    expect(router.replace).toHaveBeenCalledWith(
      `/transactions/${useTransactionsStore.getState().transactions.at(-1)!.refId}`,
    );
  });

  it("stores a sent amount as outgoing", async () => {
    await render(<TransactionForm type="out" />);

    await fill({ name: "Landlord", description: "Rent", amount: "100" });
    await userEvent.press(screen.getByLabelText("Send money"));

    expect(useTransactionsStore.getState().transactions.at(-1)).toMatchObject({
      amount: -100,
    });
    expect(toast).toHaveBeenCalledWith(expect.stringContaining("Sent"));
  });

  it("requires every field", async () => {
    await render(<TransactionForm type="out" />);

    await userEvent.press(screen.getByLabelText("Send money"));

    expect(screen.getByText("Recipient name is required")).toBeOnTheScreen();
    expect(screen.getByText("Description is required")).toBeOnTheScreen();
    expect(
      screen.getByText("Enter an amount greater than 0"),
    ).toBeOnTheScreen();
    expect(useTransactionsStore.getState().transactions).toHaveLength(1);
    expect(router.replace).not.toHaveBeenCalled();
  });

  it("rejects an amount that is not a positive number", async () => {
    await render(<TransactionForm type="in" />);

    await fill({ name: "Acme Corp", description: "Salary", amount: "0" });
    await userEvent.press(screen.getByLabelText("Add money"));

    expect(
      screen.getByText("Enter an amount greater than 0"),
    ).toBeOnTheScreen();
    expect(useTransactionsStore.getState().transactions).toHaveLength(1);
  });

  it("refuses to send more than the balance", async () => {
    await render(<TransactionForm type="out" />);

    await fill({ name: "Landlord", description: "Rent", amount: "1000.01" });
    await userEvent.press(screen.getByLabelText("Send money"));

    expect(
      screen.getByText(/^Amount exceeds your balance of RM/),
    ).toBeOnTheScreen();
    expect(useTransactionsStore.getState().transactions).toHaveLength(1);
  });

  it("allows adding more than the balance", async () => {
    await render(<TransactionForm type="in" />);

    await fill({ name: "Acme Corp", description: "Salary", amount: "5000" });
    await userEvent.press(screen.getByLabelText("Add money"));

    expect(useTransactionsStore.getState().transactions).toHaveLength(2);
  });

  it("trims whitespace around the entered names", async () => {
    await render(<TransactionForm type="in" />);

    await fill({
      name: "  Acme Corp  ",
      description: "  Salary  ",
      amount: "5",
    });
    await userEvent.press(screen.getByLabelText("Add money"));

    expect(useTransactionsStore.getState().transactions.at(-1)).toMatchObject({
      recipientName: "Acme Corp",
      transferName: "Salary",
    });
  });

  it("accepts a comma as the decimal separator", async () => {
    await render(<TransactionForm type="in" />);

    await fill({ name: "Acme Corp", description: "Salary", amount: "12,50" });
    await userEvent.press(screen.getByLabelText("Add money"));

    expect(useTransactionsStore.getState().transactions.at(-1)).toMatchObject({
      amount: 12.5,
    });
  });

  it("translates its labels and errors", async () => {
    await i18n.changeLanguage("ms");
    await render(<TransactionForm type="out" />);

    expect(screen.getByLabelText("Nama Penerima")).toBeOnTheScreen();
    expect(screen.getByLabelText("Hantar wang")).toBeOnTheScreen();

    await userEvent.press(screen.getByLabelText("Hantar wang"));

    expect(screen.getByText("Nama penerima diperlukan")).toBeOnTheScreen();
    expect(screen.getByText("Keterangan diperlukan")).toBeOnTheScreen();
  });
});
