import { Feather } from "@expo/vector-icons";
import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";

export const ActionButtons = () => {
  const handleActionPress = useCallback(
    (action: "add" | "send" | "history" | "more") => {
      console.log(`Action pressed: ${action}`);
    },
    [],
  );

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleActionPress("add")}
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Add"
      >
        <View style={styles.iconWrapper}>
          <Feather name="plus" size={32} color={Colors.primaryDark} />
        </View>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleActionPress("send")}
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Send"
      >
        <View style={styles.iconWrapper}>
          <Feather name="arrow-up-right" size={32} color={Colors.primaryDark} />
        </View>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleActionPress("history")}
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="History"
      >
        <View style={styles.iconWrapper}>
          <Feather name="clock" size={32} color={Colors.primaryDark} />
        </View>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleActionPress("more")}
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="More"
      >
        <View style={styles.iconWrapper}>
          <Feather
            name="more-horizontal"
            size={32}
            color={Colors.primaryDark}
          />
        </View>
        <Text style={styles.buttonText}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: Spacing.three,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.two,
  },
  iconWrapper: {
    borderRadius: 999,
    padding: Spacing.two,
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
});
