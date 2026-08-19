import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Spacing } from "@/constants/theme";
import {
  ActionButtons,
  CardHeader,
  Transactions,
} from "@/modules/home/components";

export default function IndexScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <CardHeader name="Rizki" />
        <ActionButtons />
        <Transactions />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three + Spacing.one,
    gap: Spacing.four,
  },
});
