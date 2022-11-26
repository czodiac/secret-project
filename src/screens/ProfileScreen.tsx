import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, Button, View } from "react-native";
import { StackParams } from "../common/StackParams";

type Props = NativeStackScreenProps<StackParams, "Profile">;
export const ProfileScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>My Profile</Text>
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      </View>
      {navigation.canGoBack() ? (
        <Button
          title="Can go back"
          onPress={() => navigation.goBack()}
        ></Button>
      ) : (
        <Button title="Can't go back"></Button>
      )}
    </View>
  );
};
