import { render, screen, userEvent } from "@testing-library/react-native";
import * as Clipboard from "expo-clipboard";

import i18n from "@/i18n";
import type { Transaction } from "@/types/transaction.type";
import { TransactionDetails } from "../transaction-details";

const transaction: Transaction = {
  refId: "123ABC",
  transferDate: "2024-10-15T12:34:56Z",
  recipientName: "John Doe",
  transferName: "Salary Payment",
  amount: 1500,
};

afterEach(async () => {
  await i18n.changeLanguage("en");
});

describe("TransactionDetails", () => {
  it("shows the transfer name, amount and every detail row", async () => {
    await render(<TransactionDetails transaction={transaction} />);

    expect(screen.getByText("Salary Payment")).toBeOnTheScreen();
    expect(screen.getByText(/^\+RM/)).toBeOnTheScreen();
    expect(screen.getByText("Reference ID")).toBeOnTheScreen();
    expect(screen.getByText("123ABC")).toBeOnTheScreen();
    expect(screen.getByText("Recipient Name")).toBeOnTheScreen();
    expect(screen.getByText("John Doe")).toBeOnTheScreen();
    expect(screen.getByText("Transfer Date")).toBeOnTheScreen();
  });

  it("signs an outgoing amount", async () => {
    await render(
      <TransactionDetails transaction={{ ...transaction, amount: -500 }} />,
    );

    expect(screen.getByText(/^-RM/)).toBeOnTheScreen();
    expect(screen.getByLabelText(/^Amount out /)).toBeOnTheScreen();
  });

  it("copies the reference id", async () => {
    await render(<TransactionDetails transaction={transaction} />);

    await userEvent.press(screen.getByLabelText("Copy Reference ID"));

    expect(Clipboard.setStringAsync).toHaveBeenCalledWith("123ABC");
  });

  it("hides the copy button while capturing, so it stays out of the image", async () => {
    await render(<TransactionDetails transaction={transaction} isCapturing />);

    expect(screen.queryByLabelText("Copy Reference ID")).not.toBeOnTheScreen();
  });

  it("translates the row labels", async () => {
    await i18n.changeLanguage("ms");
    await render(<TransactionDetails transaction={transaction} />);

    expect(screen.getByText("ID Rujukan")).toBeOnTheScreen();
    expect(screen.getByText("Nama Penerima")).toBeOnTheScreen();
    expect(screen.getByText("Tarikh Pemindahan")).toBeOnTheScreen();
    expect(screen.getByLabelText("Salin ID Rujukan")).toBeOnTheScreen();
  });
});
