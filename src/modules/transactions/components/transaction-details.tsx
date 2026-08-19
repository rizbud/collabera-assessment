import { Feather } from "@expo/vector-icons";
import { forwardRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ViewShot, { ViewShotRef } from "react-native-view-shot";

import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useI18n } from "@/i18n";
import { Transaction } from "@/types/transaction.type";
import { copyToClipboard, formatCurrency, formatDatetime } from "@/utils";

interface RowProps {
  label: string;
  value: string;
  canCopy?: boolean;
}

interface TransactionDetailsProps {
  transaction: Transaction;
  isCapturing?: boolean;
}

const Row = ({ label, value, canCopy }: RowProps) => {
  const { t } = useI18n();

  return (
  <View style={styles.row}>
    <Text
      style={styles.label}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      {label}
    </Text>
    <View style={styles.valueWrapper}>
      <Text
        numberOfLines={1}
        style={styles.valueText}
        accessibilityRole="text"
        accessibilityLabel={value}
      >
        {value}
      </Text>
      {canCopy && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => copyToClipboard(value)}
          accessibilityRole="button"
          accessibilityLabel={t("common.copy", { label })}
        >
          <Feather name="copy" size={20} color={Colors.gray} />
        </TouchableOpacity>
      )}
    </View>
  </View>
  );
};

export const TransactionDetails = forwardRef<
  ViewShotRef,
  TransactionDetailsProps
>(({ transaction, isCapturing }, ref) => {
  const { t } = useI18n();
  const type = transaction.amount >= 0 ? "in" : "out";
  const absoluteAmount = Math.abs(transaction.amount);

  return (
    <View style={styles.container}>
      <ViewShot
        ref={ref}
        options={{
          format: "png",
          quality: 0.8,
        }}
        style={styles.viewShotContainer}
      >
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            {type === "in" ? (
              <Feather name="arrow-down-left" size={48} color={Colors.green} />
            ) : (
              <Feather name="arrow-up-right" size={48} color={Colors.red} />
            )}
          </View>
          <View>
            <Text
              style={[styles.transferName, type === "in" && styles.greenText]}
              accessibilityRole="text"
              accessibilityLabel={t("detail.transferNameA11y", {
                name: transaction.transferName,
              })}
            >
              {transaction.transferName}
            </Text>
            <Text
              style={[styles.amount, type === "in" && styles.greenText]}
              accessibilityRole="text"
              accessibilityLabel={t(`detail.amountA11y.${type}`, {
                amount: formatCurrency(absoluteAmount),
              })}
            >
              {type === "in" ? "+" : "-"}
              {formatCurrency(absoluteAmount)}
            </Text>
          </View>
        </View>

        <View style={styles.details}>
          <Row
            label={t("detail.refId")}
            value={transaction.refId}
            canCopy={!isCapturing}
          />
          <Row
            label={t("detail.recipientName")}
            value={transaction.recipientName}
          />
          <Row
            label={t("detail.transferDate")}
            value={formatDatetime(transaction.transferDate)}
          />
        </View>
      </ViewShot>
    </View>
  );
});

TransactionDetails.displayName = "TransactionDetails";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    gap: Spacing.four,
  },
  viewShotContainer: {
    gap: Spacing.four,
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: Spacing.four,
  },
  header: {
    alignItems: "center",
    gap: Spacing.two,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    padding: Spacing.one,
    borderRadius: 999,
    backgroundColor: Colors.lightGray,
  },
  transferName: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    textAlign: "center",
  },
  amount: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    textAlign: "center",
  },
  greenText: {
    color: Colors.green,
  },
  details: {
    width: "100%",
    gap: Spacing.two + Spacing.half,
    backgroundColor: Colors.background,
    padding: Spacing.three,
    borderRadius: Spacing.two,
    shadowColor: Colors.foreground,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.gray,
  },
  valueWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  valueText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});
