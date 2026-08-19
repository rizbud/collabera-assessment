import { Feather } from "@expo/vector-icons";
import { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
      <Pressable onPress={() => handleActionPress("add")} style={styles.button}>
        <View style={styles.iconWrapper}>
          <Feather name="plus" size={32} color={Colors.primaryDark} />
        </View>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
      <Pressable
        onPress={() => handleActionPress("send")}
        style={styles.button}
      >
        <View style={styles.iconWrapper}>
          <Feather name="arrow-up-right" size={32} color={Colors.primaryDark} />
        </View>
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
      <Pressable
        onPress={() => handleActionPress("history")}
        style={styles.button}
      >
        <View style={styles.iconWrapper}>
          <Feather name="clock" size={32} color={Colors.primaryDark} />
        </View>
        <Text style={styles.buttonText}>History</Text>
      </Pressable>
      <Pressable
        onPress={() => handleActionPress("more")}
        style={styles.button}
      >
        <View style={styles.iconWrapper}>
          <Feather
            name="more-horizontal"
            size={32}
            color={Colors.primaryDark}
          />
        </View>
        <Text style={styles.buttonText}>More</Text>
      </Pressable>
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
