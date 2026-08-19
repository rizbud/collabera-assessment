import { FilterTransactionValue } from "@/types/filter-transactions.type";
import { useState } from "react";

export const useTransactions = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTransactionValue>("all");

  return {
    activeFilter,
    setActiveFilter,
  };
}