import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

import { LanguageSwitcher } from "@/components";
import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useI18n } from "@/i18n";
import { useTransactionsStore } from "@/store";
import { calculateBalance, formatCurrency, greetingKey } from "@/utils";
import { useMemo } from "react";

interface CardHeaderProps {
  name: string;
}

export const CardHeader = (props: CardHeaderProps) => {
  const { name } = props;

  const { t } = useI18n();
  const transactions = useTransactionsStore((s) => s.transactions);
  const balance = useMemo(() => calculateBalance(transactions), [transactions]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.greetingWrapper}>
        <Text
          style={styles.greetingText}
          accessibilityRole="text"
          accessibilityLabel={t(greetingKey(), { name })}
        >
          {t(greetingKey(), { name })}
        </Text>
        <LanguageSwitcher />
      </View>
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.balanceLabel}>{t("home.balanceLabel")}</Text>
        <Text
          style={styles.balanceAmountText}
          accessibilityRole="text"
          accessibilityLabel={t("home.balanceA11y", {
            amount: formatCurrency(balance),
          })}
        >
          {formatCurrency(balance)}
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.two,
  },
  card: {
    padding: Spacing.three,
    gap: Spacing.one,
    backgroundColor: Colors.primary,
    borderRadius: Spacing.two,
  },
  greetingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.two,
  },
  greetingText: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.foreground,
  },
  balanceLabel: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.background,
  },
  balanceAmountText: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.background,
  },
});
