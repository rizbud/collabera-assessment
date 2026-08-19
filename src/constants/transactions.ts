import type { Transactions } from "@/types/transaction.type";

export const MOCK_TRANSACTIONS: Transactions = [
  {
    refId: "123ABC",
    transferDate: "2024-10-15T12:34:56Z",
    recipientName: "John Doe",
    transferName: "Salary Payment",
    amount: 1500.0,
  },
  {
    refId: "456DEF",
    transferDate: "2024-09-21T09:12:45Z",
    recipientName: "Jane Smith",
    transferName: "Invoice Payment",
    amount: 2300.75,
  },
  {
    refId: "789GHI",
    transferDate: "2024-10-05T16:18:30Z",
    recipientName: "Robert Brown",
    transferName: "Refund",
    amount: -500.0,
  },
  {
    refId: "101JKL",
    transferDate: "2024-08-30T11:47:22Z",
    recipientName: "Emily Davis",
    transferName: "Bonus Payment",
    amount: 1200.0,
  },
  {
    refId: "202MNO",
    transferDate: "2024-08-12T08:05:10Z",
    recipientName: "Michael Lee",
    transferName: "Utility Bill",
    amount: -320.4,
  },
  {
    refId: "303PQR",
    transferDate: "2024-07-28T19:41:03Z",
    recipientName: "Sarah Wilson",
    transferName: "Rent",
    amount: -1800.0,
  },
];
