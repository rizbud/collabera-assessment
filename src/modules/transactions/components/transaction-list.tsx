import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, View } from "react-native";

import { TransactionItem } from "@/components";
import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useI18n } from "@/i18n";
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
}: TransactionMonthHeader) => {
  const { t } = useI18n();

  return (
    <View
      style={[
        styles.monthHeader,
        { paddingTop: index === 0 ? Spacing.two : Spacing.three },
      ]}
    >
      <Text
        style={styles.monthText}
        accessibilityRole="header"
        accessibilityLabel={t("transactions.monthA11y", { month })}
      >
        {month}
      </Text>
      <View>
        <Text
          style={styles.totalText}
          accessibilityRole="text"
          accessibilityLabel={t("transactions.incomingA11y", {
            amount: formatCurrency(incoming),
          })}
        >
          {t("transactions.incoming", { amount: formatCurrency(incoming) })}
        </Text>
        <Text
          style={styles.totalText}
          accessibilityRole="text"
          accessibilityLabel={t("transactions.outgoingA11y", {
            amount: formatCurrency(outgoing),
          })}
        >
          {t("transactions.outgoing", { amount: formatCurrency(outgoing) })}
        </Text>
      </View>
    </View>
  );
};

export const TransactionList = ({ data }: TransactionListProps) => {
  const { t } = useI18n();

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
          accessibilityLabel={t("common.empty")}
        >
          {t("common.empty")}
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
