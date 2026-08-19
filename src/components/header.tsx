import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";

interface HeaderProps {
  title: string;
  canGoBack?: boolean;
}

export const Header = ({ title, canGoBack = true }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Back"
        activeOpacity={0.7}
        disabled={!canGoBack}
        onPress={() => router.back()}
      >
        <Feather name="chevron-left" size={24} />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.one,
    shadowColor: Colors.foreground,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: Colors.background,
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
});
