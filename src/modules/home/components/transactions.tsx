import { Feather } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TransactionItem } from "@/components";
import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useTransactionsStore } from "@/store";
import { sortByDateDesc } from "@/utils";

const RECENT_COUNT = 5;

export const Transactions = () => {
  const transactions = useTransactionsStore((s) => s.transactions);
  const recent = useMemo(
    () => sortByDateDesc(transactions).slice(0, RECENT_COUNT),
    [transactions],
  );

  return (
    <FlashList
      accessibilityRole="list"
      ListHeaderComponent={
        <View style={styles.titleWrapper}>
          <Text
            style={styles.title}
            accessibilityRole="text"
            accessibilityLabel="Recent Transactions"
          >
            Recent Transactions
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/transactions")}
            style={styles.viewAllButton}
            accessibilityRole="button"
            accessibilityLabel="View all transactions"
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Feather name="chevron-right" size={14} color={Colors.gray} />
          </TouchableOpacity>
        </View>
      }
      data={recent}
      renderItem={({ item }) => <TransactionItem data={item} />}
      keyExtractor={(item) => item.refId}
      ListEmptyComponent={
        <Text
          style={styles.emptyText}
          accessibilityRole="text"
          accessibilityLabel="No transactions available"
        >
          No transactions available
        </Text>
      }
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.half,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.gray,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: "center",
    paddingVertical: Spacing.three,
  },
});
