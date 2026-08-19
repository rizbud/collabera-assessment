import { useMemo } from "react";

import { useTransactionsStore } from "@/store";
import { filterTransactions, groupByMonth } from "@/utils";

export const useTransactions = () => {
  const {
    transactions,
    filter: activeFilter,
    setFilter: setActiveFilter,
  } = useTransactionsStore((s) => s);

  const rows = useMemo(
    () => groupByMonth(filterTransactions(transactions, activeFilter)),
    [transactions, activeFilter],
  );

  return {
    activeFilter,
    setActiveFilter,
    rows,
  };
};
