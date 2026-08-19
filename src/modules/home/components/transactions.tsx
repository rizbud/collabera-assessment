import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TransactionItem } from "@/components";
import { Colors, Fonts, Spacing } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

export const Transactions = () => {
  return (
    <FlashList
      accessible={true}
      accessibilityRole="list"
      ListHeaderComponent={
        <View style={styles.titleWrapper}>
          <Text
            style={styles.title}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel="Recent Transactions"
          >
            Recent Transactions
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log("View all pressed")}
            style={styles.viewAllButton}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="View all transactions"
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Feather name="chevron-right" size={14} color={Colors.gray} />
          </TouchableOpacity>
        </View>
      }
      data={[
        {
          refId: "123ABC",
          transferDate: "2024-10-15T12:34:56Z",
          recipientName: "John Doe",
          transferName: "Salary Payment",
          amount: 1500.0,
        },
        {
          refId: "456DEF",
          transferDate: "2024-09-21T09:12:45Z",
          recipientName: "Jane Smith",
          transferName: "Invoice Payment",
          amount: 2300.75,
        },
        {
          refId: "789GHI",
          transferDate: "2024-10-05T16:18:30Z",
          recipientName: "Robert Brown",
          transferName: "Refund",
          amount: -500.0,
        },
        {
          refId: "101JKL",
          transferDate: "2024-08-30T11:47:22Z",
          recipientName: "Emily Davis",
          transferName: "Bonus Payment",
          amount: 1200.0,
        },
      ]}
      renderItem={({ item }) => <TransactionItem data={item} />}
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
