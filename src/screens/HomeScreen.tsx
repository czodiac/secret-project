import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screens } from "../types/screens";
import { useUser } from "../app/useUser";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<Screens, "Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  const { getUser } = useUser();
  const getUserHere = () => {
    console.log("Get User");
    getUser();
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={getUserHere}>
        Get User
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
