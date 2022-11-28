import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Appbar } from "react-native-paper";
import { openLoginModal, openRegisterModal } from "../slices/modalSlice";
import { getAuthUser } from "../slices/authSlice";
import { useUser } from "../app/useUser";

export const Header = (props: { changeScreen: (arg0: string) => void }) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(getAuthUser);
  const { logoutUser } = useUser();
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
      {authUser ? (
        <Appbar.Action icon="logout" onPress={logoutUser} />
      ) : (
        <Appbar.Action
          onFocus={() => {
            console.log("hi");
          }}
          icon="login"
          onPress={showLoginModal}
        />
      )}
      {authUser ? (
        <></>
      ) : (
        <Appbar.Action icon="account-plus" onPress={() => {}} />
      )}
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
};
