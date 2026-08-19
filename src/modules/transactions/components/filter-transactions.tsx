import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useI18n } from "@/i18n";
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
  const { t } = useI18n();

  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <TouchableOpacity
            key={filter.value}
            accessibilityRole="button"
            accessibilityLabel={t("transactions.filterA11y", {
              label: t(filter.labelKey),
            })}
            accessibilityState={{ selected: isActive }}
            activeOpacity={0.7}
            onPress={() => onFilterChange?.(filter.value)}
            style={[styles.filterButton, isActive && styles.activeFilterButton]}
          >
            <Text
              style={[styles.filterText, isActive && styles.activeFilterText]}
            >
              {t(filter.labelKey)}
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
    paddingBottom: Spacing.two,
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
