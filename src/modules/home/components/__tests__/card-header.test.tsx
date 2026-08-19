import { act, render, screen } from "@testing-library/react-native";

import i18n from "@/i18n";
import { useTransactionsStore } from "@/store";
import { CardHeader } from "../card-header";

beforeEach(async () => {
  await i18n.changeLanguage("en");
  jest.useFakeTimers().setSystemTime(new Date("2024-10-15T09:00:00"));
  useTransactionsStore.setState({
    transactions: [
      {
        refId: "A",
        transferDate: "2024-10-15T12:34:56Z",
        recipientName: "John Doe",
        transferName: "Salary",
        amount: 1000,
      },
      {
        refId: "B",
        transferDate: "2024-10-14T12:34:56Z",
        recipientName: "Landlord",
        transferName: "Rent",
        amount: -250,
      },
    ],
    filter: "all",
  });
});

afterEach(() => {
  jest.useRealTimers();
});

describe("CardHeader", () => {
  it("greets by name for the time of day", async () => {
    await render(<CardHeader name="John" />);

    expect(screen.getByText("Good morning, John!")).toBeOnTheScreen();
  });

  it("shows the balance calculated from the store", async () => {
    await render(<CardHeader name="John" />);

    expect(screen.getByText("Your Balance:")).toBeOnTheScreen();
    expect(screen.getByText(/^RM.?750\.00$/)).toBeOnTheScreen();
    expect(screen.getByLabelText(/^Your balance is RM/)).toBeOnTheScreen();
  });

  it("follows the balance when a transaction is added", async () => {
    await render(<CardHeader name="John" />);

    await act(() => {
      useTransactionsStore.getState().addTransaction({
        recipientName: "Acme Corp",
        transferName: "Bonus",
        amount: 250,
      });
    });

    expect(screen.getByText(/^RM.?1,000\.00$/)).toBeOnTheScreen();
  });

  it("greets and labels the balance in the selected language", async () => {
    await i18n.changeLanguage("ms");
    await render(<CardHeader name="John" />);

    expect(screen.getByText("Selamat pagi, John!")).toBeOnTheScreen();
    expect(screen.getByText("Baki Anda:")).toBeOnTheScreen();
  });

  it("carries the language switcher next to the greeting", async () => {
    await render(<CardHeader name="John" />);

    expect(screen.getByLabelText("Switch language to MY")).toBeOnTheScreen();
  });
});
