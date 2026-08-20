import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useI18n } from "@/i18n";
import { Transaction } from "@/types/transaction.type";
import { formatCurrency, formatDatetime } from "@/utils";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TransactionItemProps {
  data: Transaction;
}

export const TransactionItem = (props: TransactionItemProps) => {
  const { t, currentLanguage } = useI18n();
  const { data } = props;
  const type = data.amount >= 0 ? "in" : "out";
  const absoluteAmount = Math.abs(data.amount);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.wrapper}
      onPress={() => router.push(`/transactions/${data.refId}`)}
      accessibilityRole="button"
      accessibilityLabel={t(`transactions.itemA11y.${type}`, {
        name: data.transferName,
        amount: formatCurrency(absoluteAmount),
        recipient: data.recipientName,
        date: formatDatetime(data.transferDate, currentLanguage),
      })}
    >
      <View style={styles.iconWrapper}>
        {type === "in" ? (
          <Feather name="arrow-down-left" size={28} color={Colors.green} />
        ) : (
          <Feather name="arrow-up-right" size={28} color={Colors.red} />
        )}
      </View>
      <View style={styles.flex}>
        <View style={styles.row}>
          <View style={styles.flex}>
            <Text numberOfLines={1} style={styles.recipientName}>
              {data.recipientName}
            </Text>
          </View>
          <View style={styles.flex}>
            <Text numberOfLines={1} style={styles.transferDate}>
              {formatDatetime(data.transferDate, currentLanguage)}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.flex}>
            <Text numberOfLines={1} style={styles.transferName}>
              {data.transferName}
            </Text>
          </View>
          <View style={styles.flex}>
            <Text
              numberOfLines={1}
              style={[
                styles.amount,
                {
                  color: type === "in" ? Colors.green : Colors.foreground,
                },
              ]}
            >
              {type === "in" ? "+" : "-"}
              {formatCurrency(absoluteAmount)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    gap: Spacing.two + Spacing.one,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    padding: Spacing.one,
    borderRadius: 999,
    backgroundColor: Colors.lightGray,
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.one,
  },
  recipientName: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    flex: 1,
  },
  transferDate: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.gray,
    flex: 1,
    textAlign: "right",
  },
  transferName: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    flex: 1,
    textAlign: "right",
  },
});
