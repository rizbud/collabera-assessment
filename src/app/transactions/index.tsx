import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/header";
import { Colors, Spacing } from "@/constants/theme";
import {
  FilterTransactions,
  TransactionList,
} from "@/modules/transactions/components";
import { useTransactions } from "@/modules/transactions/hooks";

export default function TransactionsScreen() {
  const { activeFilter, setActiveFilter, rows } = useTransactions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Transaction History" />

      <View style={styles.container}>
        <FilterTransactions
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <TransactionList data={rows} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    gap: Spacing.three,
  },
  container: {
    flex: 1,
  },
});
