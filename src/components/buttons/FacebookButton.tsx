import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Text } from "react-native-paper";
import { FacebookLogo } from "./logos/FacebookLogo";

WebBrowser.maybeCompleteAuthSession();

export const FacebookButton = ({
  text,
  onPress,
  style,
}: {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <FacebookLogo style={styles.logo} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#3b5998",
    height: 50,
  },
  logo: { marginTop: 1 },
  text: {
    color: "#fff",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
});
