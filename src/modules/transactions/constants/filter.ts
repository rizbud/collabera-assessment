import { FilterTransaction } from "@/types/filter-transactions.type";

export const FILTERS: FilterTransaction[] = [
  { labelKey: "transactions.filters.all", value: "all" },
  { labelKey: "transactions.filters.in", value: "in" },
  { labelKey: "transactions.filters.out", value: "out" },
];
