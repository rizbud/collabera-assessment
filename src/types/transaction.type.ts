export interface Transaction {
  refId: string;
  transferDate: string;
  recipientName: string;
  transferName: string;
  amount: number;
}

export type Transactions = Transaction[];

// A transaction being created: refId and transferDate are stamped by the store
export type NewTransaction = Omit<Transaction, "refId" | "transferDate">;

export interface TransactionMonthHeader {
  month: string;
  incoming: number;
  outgoing: number;
  index?: number;
}

export type TransactionRow = TransactionMonthHeader | Transaction;
