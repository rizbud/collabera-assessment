import { FilterTransaction } from "@/types/filter-transactions.type";

export const FILTERS: FilterTransaction[] = [
  { label: "All", value: "all" },
  { label: "Incoming", value: "in" },
  { label: "Outgoing", value: "out" },
]