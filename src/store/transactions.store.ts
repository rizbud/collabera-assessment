import { create } from "zustand";

import { MOCK_TRANSACTIONS } from "@/constants/transactions";
import type { FilterTransactionValue } from "@/types/filter-transactions.type";
import type { Transactions } from "@/types/transaction.type";

interface TransactionsState {
  transactions: Transactions;
  filter: FilterTransactionValue;
  setFilter: (filter: FilterTransactionValue) => void;
}

export const useTransactionsStore = create<TransactionsState>((set) => ({
  // ponytail: seeded with mock data; swap for an API fetch action when a backend exists
  transactions: MOCK_TRANSACTIONS,
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
