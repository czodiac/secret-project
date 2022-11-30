import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Appbar, Avatar } from "react-native-paper";
import { openLoginModal, openRegisterModal } from "../slices/modalSlice";
import { getAuthUser } from "../slices/authSlice";
import { useUser } from "../app/useUser";
import { StyleSheet } from "react-native";
import noProfliePic from "../../assets/user-profile-icon.svg";

export const Header = (props: { changeScreen: (arg0: string) => void }) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(getAuthUser);
  const { logoutUser } = useUser();
  const showLoginModal = () => {
    dispatch(openLoginModal());
  };
  const [profileImg, setProfileImg] = useState("");
  useEffect(() => {
    // To Do: Needs to have default pic.
    let profileImg = noProfliePic;
    if (authUser) {
      // To Do: Needs to check if it's google login or native login.
      if (authUser.picture) {
        profileImg = authUser.picture;
      }
    }
    setProfileImg(profileImg);
  }, [authUser]);

  const styles = StyleSheet.create({
    profile: {
      backgroundImage: `url(${profileImg})`,
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      height: 24,
      width: 24,
    },
  });

  return (
    <Appbar.Header>
      <Appbar.Content title="Iltae" subtitle="Secret" />
      <Appbar.Action icon="home" onPress={() => props.changeScreen("Home")} />
      {authUser ? (
        <Appbar.Action
          icon=""
          style={styles.profile}
          onPress={() => props.changeScreen("Profile")}
        />
      ) : (
        <></>
      )}
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
