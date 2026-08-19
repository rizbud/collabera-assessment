import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";
import { calculateBalance, formatCurrency, greeting } from "@/utils";
import { useTransactionsStore } from "@/store";
import { useMemo } from "react";

interface CardHeaderProps {
  name: string;
}

export const CardHeader = (props: CardHeaderProps) => {
  const { name } = props;

  const transactions = useTransactionsStore((s) => s.transactions);
  const balance = useMemo(() => calculateBalance(transactions), [transactions]);

  return (
    <View style={styles.wrapper}>
      <Text
        style={styles.greetingText}
        accessibilityRole="text"
        accessibilityLabel={greeting(name)}
      >
        {greeting(name)}
      </Text>
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.balanceLabel}>Your Balance:</Text>
        <Text
          style={styles.balanceAmountText}
          accessibilityRole="text"
          accessibilityLabel={`Your balance is ${formatCurrency(balance)}`}
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
  greetingText: {
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
