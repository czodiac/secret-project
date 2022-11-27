import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screens } from "../types/screens";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<Screens, "Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => {}}>
        Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
