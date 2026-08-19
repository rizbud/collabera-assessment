import { render, screen, userEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import i18n from "@/i18n";
import type { Transaction } from "@/types/transaction.type";
import { TransactionItem } from "../transaction-item";

const incoming: Transaction = {
  refId: "123ABC",
  transferDate: "2024-10-15T12:34:56Z",
  recipientName: "John Doe",
  transferName: "Salary Payment",
  amount: 1500,
};

const outgoing: Transaction = { ...incoming, refId: "789GHI", amount: -500 };

afterEach(async () => {
  await i18n.changeLanguage("en");
});

describe("TransactionItem", () => {
  it("shows the recipient, description and a signed amount", async () => {
    await render(<TransactionItem data={incoming} />);

    expect(screen.getByText("John Doe")).toBeOnTheScreen();
    expect(screen.getByText("Salary Payment")).toBeOnTheScreen();
    expect(screen.getByText(/^\+RM/)).toBeOnTheScreen();
  });

  it("marks an outgoing amount with a minus", async () => {
    await render(<TransactionItem data={outgoing} />);

    expect(screen.getByText(/^-RM/)).toBeOnTheScreen();
  });

  it("describes the transaction for screen readers", async () => {
    await render(<TransactionItem data={incoming} />);

    expect(
      screen.getByLabelText(
        /^Incoming transaction Salary Payment of .* from John Doe on /,
      ),
    ).toBeOnTheScreen();
  });

  it("describes an outgoing transaction as sent to the recipient", async () => {
    await render(<TransactionItem data={outgoing} />);

    expect(
      screen.getByLabelText(/^Outgoing transaction .* to John Doe on /),
    ).toBeOnTheScreen();
  });

  it("uses the selected language", async () => {
    await i18n.changeLanguage("ms");
    await render(<TransactionItem data={incoming} />);

    expect(screen.getByLabelText(/^Transaksi masuk /)).toBeOnTheScreen();
  });

  it("opens the transaction detail when pressed", async () => {
    await render(<TransactionItem data={incoming} />);

    await userEvent.press(screen.getByRole("button"));

    expect(router.push).toHaveBeenCalledWith("/transactions/123ABC");
  });
});
