import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, StyleSheet, Pressable } from "react-native";
import { Button, Appbar } from "react-native-paper";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { openLoginModal, openRegisterModal } from "../slices/ModalSlice";

export const Header = (props: { changeScreen: (arg0: string) => void }) => {
  const dispatch = useDispatch();
  const showLoginModal = () => {
    dispatch(openLoginModal());
  };

  return (
    <Appbar.Header>
      <Appbar.Content title="Iltae" subtitle="Secret" />
      <Appbar.Action icon="home" onPress={() => props.changeScreen("Home")} />
      <Appbar.Action
        icon="face-man-profile"
        onPress={() => props.changeScreen("Profile")}
      />
      <Appbar.Action icon="login" onPress={showLoginModal} />
      <Appbar.Action icon="account-plus" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      <Button onPress={() => props.changeScreen("Profile")}>Profile</Button>
    </Appbar.Header>
  );
};
