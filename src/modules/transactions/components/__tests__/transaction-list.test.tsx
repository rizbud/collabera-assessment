import { render, screen } from "@testing-library/react-native";

import i18n from "@/i18n";
import type { TransactionRow } from "@/types/transaction.type";
import { groupByMonth } from "@/utils";
import { TransactionList } from "../transaction-list";

const transactions = [
  {
    refId: "123ABC",
    transferDate: "2024-10-15T12:34:56Z",
    recipientName: "John Doe",
    transferName: "Salary Payment",
    amount: 1500,
  },
  {
    refId: "789GHI",
    transferDate: "2024-09-05T16:18:30Z",
    recipientName: "Robert Brown",
    transferName: "Refund",
    amount: -500,
  },
];

const rows: TransactionRow[] = groupByMonth(transactions);

afterEach(async () => {
  await i18n.changeLanguage("en");
});

describe("TransactionList", () => {
  it("renders a header per month with its totals", async () => {
    await render(<TransactionList data={rows} />);

    expect(screen.getByText("October 2024")).toBeOnTheScreen();
    expect(screen.getByText("September 2024")).toBeOnTheScreen();
    expect(screen.getByText(/^Incoming: RM.?1,500\.00$/)).toBeOnTheScreen();
    expect(screen.getByText(/^Outgoing: RM.?500\.00$/)).toBeOnTheScreen();
  });

  it("renders the transactions under their month", async () => {
    await render(<TransactionList data={rows} />);

    expect(screen.getByText("John Doe")).toBeOnTheScreen();
    expect(screen.getByText("Robert Brown")).toBeOnTheScreen();
  });

  it("shows an empty state when there is nothing to list", async () => {
    await render(<TransactionList data={[]} />);

    expect(screen.getByText("No transactions available")).toBeOnTheScreen();
  });

  it("translates the month totals and the empty state", async () => {
    await i18n.changeLanguage("ms");
    await render(<TransactionList data={[]} />);

    expect(screen.getByText("Tiada transaksi tersedia")).toBeOnTheScreen();

    // month labels are built when the rows are grouped, which the screen redoes
    // on a language change
    await render(<TransactionList data={groupByMonth(transactions)} />);
    expect(screen.getByText("Oktober 2024")).toBeOnTheScreen();
    expect(screen.getAllByText(/^Masuk: RM/)).toHaveLength(2);
    expect(screen.getAllByText(/^Keluar: RM/)).toHaveLength(2);
  });
});
