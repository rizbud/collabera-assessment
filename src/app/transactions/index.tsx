import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/header";
import { Colors, Spacing } from "@/constants/theme";
import { useI18n } from "@/i18n";
import {
  FilterTransactions,
  TransactionList,
} from "@/modules/transactions/components";
import { useTransactions } from "@/modules/transactions/hooks";

export default function TransactionsScreen() {
  const { t } = useI18n();
  const { activeFilter, setActiveFilter, rows } = useTransactions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={t("transactions.title")} />

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
