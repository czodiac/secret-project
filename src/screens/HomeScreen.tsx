import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screens } from "../common/types";
import { useUser } from "../app/useUser";
import { getAuthUser } from "../slices/authSlice";
import { AuthMethod } from "../common/enums";

type Props = NativeStackScreenProps<Screens, "Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(getAuthUser);
  const { getUser } = useUser();
  const getUserHere = () => {
    getUser();
  };
  const getUserFromRedux = () => {
    if (authUser) {
      console.log("authMethod: " + AuthMethod[authUser.authMethod]);
      console.log(authUser);
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={getUserHere}>
        Get User from App Storage
      </Button>
      <Button mode="contained" onPress={getUserFromRedux}>
        Get User from Redux Store
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
