import { Feather } from "@expo/vector-icons";
import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";
import { router } from "expo-router";

export const ActionButtons = () => {
  const handleActionPress = useCallback(
    (action: "add" | "send" | "history" | "more") => {
      switch (action) {
        case "add":
          router.push("/transactions/add");
          break;
        case "send":
          router.push("/transactions/send");
          break;
        case "history":
          router.push("/transactions");
          break;
        default:
          console.log(`Action pressed: ${action}`);
          break;
      }
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
    backgroundColor: Colors.lightGray,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
});
