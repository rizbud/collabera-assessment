export interface Transaction {
  refId: string;
  transferDate: string;
  recipientName: string;
  transferName: string;
  amount: number;
}

export type Transactions = Transaction[];

export interface TransactionMonthHeader {
  month: string;
  incoming: number;
  outgoing: number;
  index?: number;
}

export type TransactionRow = TransactionMonthHeader | Transaction;
