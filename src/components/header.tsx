import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native-paper";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { openLoginModal, openRegisterModal } from "../slices/modalSlice";

export const Header = (props: { changeScreen: (arg0: string) => void }) => {
  const dispatch = useDispatch();
  const showLoginModal = () => {
    dispatch(openLoginModal());
  };
  return (
    <>
      <Button onPress={() => props.changeScreen("Home")}>Home</Button>
      <Button onPress={() => props.changeScreen("Profile")}>Profile</Button>
      <Button onPress={showLoginModal}>Show Modal</Button>
    </>
  );
};
