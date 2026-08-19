import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useI18n } from "@/i18n";

import { LanguageSwitcher } from "./language-switcher";

interface HeaderProps {
  title: string;
  canGoBack?: boolean;
}

export const Header = ({ title, canGoBack = true }: HeaderProps) => {
  const { t } = useI18n();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={t("common.back")}
        activeOpacity={0.7}
        disabled={!canGoBack}
        onPress={() => router.back()}
      >
        <Feather name="chevron-left" size={24} />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.switcherWrapper}>
        <LanguageSwitcher />
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
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  switcherWrapper: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
});
