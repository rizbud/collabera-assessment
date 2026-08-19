import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";
import { formatCurrency, greeting } from "@/utils";

interface CardHeaderProps {
  name: string;
  balance: number;
}

export const CardHeader = (props: CardHeaderProps) => {
  const { name, balance } = props;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.greetingText}>{greeting(name)}</Text>
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.balanceLabel}>Your Balance:</Text>
        <Text style={styles.balanceAmountText}>{formatCurrency(balance)}</Text>
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
    color: Colors.white,
  },
  balanceAmountText: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
});
