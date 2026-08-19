import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";
import { FilterTransactionValue } from "@/types/filter-transactions.type";
import { FILTERS } from "../constants";

interface FilterTransactionsProps {
  activeFilter?: FilterTransactionValue;
  onFilterChange?: (filter: FilterTransactionValue) => void;
}

export const FilterTransactions = ({
  activeFilter = "all",
  onFilterChange,
}: FilterTransactionsProps) => {
  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <TouchableOpacity
            key={filter.value}
            accessibilityRole="button"
            accessibilityLabel={`Filter transactions by ${filter.label}`}
            accessibilityState={{ selected: isActive }}
            activeOpacity={0.7}
            onPress={() => onFilterChange?.(filter.value)}
            style={[styles.filterButton, isActive && styles.activeFilterButton]}
          >
            <Text
              style={[styles.filterText, isActive && styles.activeFilterText]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  filterButton: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  filterText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  activeFilterButton: {
    backgroundColor: Colors.primary,
  },
  activeFilterText: {
    color: Colors.background,
  },
});
