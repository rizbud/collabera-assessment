import { Colors, Spacing } from "@/constants/theme";
import { CardHeader } from "@/modules/home/components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CardHeader name="John Doe" balance={1000} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.three,
  },
});
