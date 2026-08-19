import { StyleSheet } from "react-native";

import { Header } from "@/components/header";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionDetailScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Transaction Details" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
