import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";
import { LANGUAGES, useI18n } from "@/i18n";

export const LanguageSwitcher = () => {
  const { t, changeLanguage, currentLanguage } = useI18n();

  return (
    <View style={styles.container}>
      {LANGUAGES.map(({ code, label }) => {
        const isActive = currentLanguage === code;

        return (
          <TouchableOpacity
            key={code}
            activeOpacity={0.7}
            onPress={() => changeLanguage(code)}
            style={[styles.button, isActive && styles.activeButton]}
            accessibilityRole="button"
            accessibilityLabel={t("common.switchLanguage", { language: label })}
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: Colors.lightGray,
    padding: Spacing.half,
  },
  button: {
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
    borderRadius: 999,
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: Colors.gray,
  },
  activeText: {
    color: Colors.background,
  },
});
