import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/header";
import { Colors, Fonts, Spacing } from "@/constants/theme";
import { TransactionDetails } from "@/modules/transactions/components";
import { useTransaction } from "@/modules/transactions/hooks";

export default function TransactionDetailScreen() {
  const { "ref-id": refId } = useLocalSearchParams<{ "ref-id": string }>();
  const { transaction, shotRef, isCapturing, handleShotRef } =
    useTransaction(refId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Transaction Details" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {transaction ? (
          <>
          <TransactionDetails
            ref={shotRef}
            isCapturing={isCapturing}
            transaction={transaction}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Share transaction details"
            style={styles.shareButton}
            onPress={handleShotRef}
          >
            <Feather name="share-2" size={24} color={Colors.background} />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.notFoundText} accessibilityRole="text">
            Transaction not found
          </Text>
        )}
      </ScrollView>
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
    flexGrow: 1,
  },
  notFoundText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: "center",
    paddingVertical: Spacing.three,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.two + Spacing.one,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.two,
    backgroundColor: Colors.primary,
    gap: Spacing.two,
    marginHorizontal: Spacing.three,
    marginBottom: Spacing.two,
  },
  shareButtonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.background,
    marginLeft: Spacing.two,
  },
});
