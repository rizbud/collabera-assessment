import { useMemo } from "react";

import { useI18n } from "@/i18n";
import { useTransactionsStore } from "@/store";
import { filterTransactions, groupByMonth } from "@/utils";

export const useTransactions = () => {
  // Month headers are localized, so they are rebuilt when the language changes
  const { currentLanguage } = useI18n();
  const {
    transactions,
    filter: activeFilter,
    setFilter: setActiveFilter,
  } = useTransactionsStore((s) => s);

  const rows = useMemo(
    () => groupByMonth(filterTransactions(transactions, activeFilter)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactions, activeFilter, currentLanguage],
  );

  return {
    activeFilter,
    setActiveFilter,
    rows,
  };
};
