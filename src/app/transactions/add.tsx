import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/header";
import { Colors } from "@/constants/theme";
import { TransactionForm } from "@/modules/transactions/components";

export default function AddTransactionScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Add Money" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <TransactionForm type="in" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
