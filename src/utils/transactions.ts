import type { FilterTransactionValue } from "@/types/filter-transactions.type";
import type {
  TransactionMonthHeader,
  TransactionRow,
  Transactions,
} from "@/types/transaction.type";

export const isMonthHeader = (
  row: TransactionRow,
): row is TransactionMonthHeader => "month" in row;

// Net balance of the given transactions (incoming minus outgoing)
export const calculateBalance = (transactions: Transactions): number =>
  transactions.reduce((total, t) => total + t.amount, 0);

// Sort transactions by transferDate in descending order (newest first)
export const sortByDateDesc = (transactions: Transactions): Transactions =>
  [...transactions].sort(
    (a, b) => +new Date(b.transferDate) - +new Date(a.transferDate),
  );

export const filterTransactions = (
  transactions: Transactions,
  filter: FilterTransactionValue,
): Transactions =>
  filter === "all"
    ? transactions
    : transactions.filter((t) =>
        filter === "in" ? t.amount >= 0 : t.amount < 0,
      );

// Group transactions by month and return a flattened array of month headers and transactions.
// Each header carries that month's incoming/outgoing totals of the rows given,
// so the totals follow the active filter.
export const groupByMonth = (transactions: Transactions): TransactionRow[] => {
  const rows: TransactionRow[] = [];
  let header: TransactionMonthHeader | undefined;

  for (const transaction of sortByDateDesc(transactions)) {
    const month = new Date(transaction.transferDate).toLocaleDateString(
      undefined,
      { month: "long", year: "numeric" },
    );

    if (header?.month !== month) {
      header = { month, incoming: 0, outgoing: 0 };
      rows.push(header);
    }

    if (transaction.amount >= 0) {
      header.incoming += transaction.amount;
    } else {
      header.outgoing += Math.abs(transaction.amount);
    }

    rows.push(transaction);
  }

  return rows;
};
