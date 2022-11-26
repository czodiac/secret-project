import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import { GoogleLogo } from "./logos/GoogleLogo";

WebBrowser.maybeCompleteAuthSession();

export const GoogleButton = ({
  text,
  style,
  onPress,
}: {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {/* specific margins to line up with the other social buttons */}
      <GoogleLogo style={styles.logo} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 5,
    backgroundColor: "white",
    height: 50,
  },
  logo: { marginTop: 1 },
  text: {
    color: "#36454f",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
});
