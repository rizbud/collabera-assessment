export type FilterTransactionValue = "all" | "in" | "out";

export interface FilterTransaction {
  labelKey: string;
  value: FilterTransactionValue;
}
