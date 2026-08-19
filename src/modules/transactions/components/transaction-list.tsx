import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, View } from "react-native";

import { TransactionItem } from "@/components";
import { Colors, Fonts, Spacing } from "@/constants/theme";
import {
  TransactionMonthHeader,
  TransactionRow,
} from "@/types/transaction.type";
import { formatCurrency, isMonthHeader } from "@/utils";

interface TransactionListProps {
  data: TransactionRow[];
}

const MonthHeader = ({
  month,
  incoming,
  outgoing,
  index,
}: TransactionMonthHeader) => (
  <View
    style={[
      styles.monthHeader,
      { paddingTop: index === 0 ? Spacing.two : Spacing.three },
    ]}
  >
    <Text
      style={styles.monthText}
      accessibilityRole="header"
      accessibilityLabel={`Transactions in ${month}`}
    >
      {month}
    </Text>
    <View>
      <Text
        style={styles.totalText}
        accessibilityRole="text"
        accessibilityLabel={`Incoming ${formatCurrency(incoming)}`}
      >
        Incoming: {formatCurrency(incoming)}
      </Text>
      <Text
        style={styles.totalText}
        accessibilityRole="text"
        accessibilityLabel={`Outgoing ${formatCurrency(outgoing)}`}
      >
        Outgoing: {formatCurrency(outgoing)}
      </Text>
    </View>
  </View>
);

export const TransactionList = ({ data }: TransactionListProps) => {
  return (
    <FlashList
      accessibilityRole="list"
      data={data}
      getItemType={(item) => (isMonthHeader(item) ? "header" : "row")}
      renderItem={({ item, index }) =>
        isMonthHeader(item) ? (
          <MonthHeader {...item} index={index} />
        ) : (
          <TransactionItem data={item} />
        )
      }
      keyExtractor={(item) => (isMonthHeader(item) ? item.month : item.refId)}
      ListEmptyComponent={
        <Text
          style={styles.emptyText}
          accessibilityRole="text"
          accessibilityLabel="No transactions available"
        >
          No transactions available
        </Text>
      }
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.four,
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.two,
    backgroundColor: Colors.background,
    paddingBottom: Spacing.one,
  },
  monthText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.gray,
  },
  totalText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.gray,
    textAlign: "right",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: "center",
    paddingVertical: Spacing.three,
  },
});
