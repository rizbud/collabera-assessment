import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/header";
import { Colors, Spacing } from "@/constants/theme";
import {
  FilterTransactions,
  TransactionList,
} from "@/modules/transactions/components";
import { useTransactions } from "@/modules/transactions/hooks";

export default function TransactionsScreen() {
  const { activeFilter, setActiveFilter } = useTransactions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Transaction History" />
      <FilterTransactions
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <TransactionList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    gap: Spacing.three,
  },
});
