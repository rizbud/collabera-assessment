import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { MOCK_TRANSACTIONS } from "@/constants/transactions";
import type { FilterTransactionValue } from "@/types/filter-transactions.type";
import type {
  NewTransaction,
  Transaction,
  Transactions,
} from "@/types/transaction.type";

interface TransactionsState {
  transactions: Transactions;
  filter: FilterTransactionValue;
  setFilter: (filter: FilterTransactionValue) => void;
  addTransaction: (transaction: NewTransaction) => Transaction;
}

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set) => ({
      transactions: MOCK_TRANSACTIONS,
      filter: "all",
      setFilter: (filter) => set({ filter }),
      addTransaction: (transaction) => {
        const created: Transaction = {
          ...transaction,
          refId: Math.random().toString(36).slice(2, 8).toUpperCase(),
          transferDate: new Date().toISOString(),
        };

        set((state) => ({ transactions: [...state.transactions, created] }));

        return created;
      },
    }),
    {
      name: "transactions",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ transactions: state.transactions }),
    },
  ),
);
