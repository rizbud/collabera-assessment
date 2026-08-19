export type FilterTransactionValue = "all" | "in" | "out";

export interface FilterTransaction {
  label: string;
  value: FilterTransactionValue;
}
