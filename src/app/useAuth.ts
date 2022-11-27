import React from 'react';
import { useEffect } from "react";
import { useAppDispatch } from './hooks'
import { useNavigation } from "@react-navigation/native";

import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import AuthService from "../services/authService"
import { User } from "../types/user";
import { useUser } from "./useUser";
import { setLoadingStatus, setLoadingMsg } from '../slices/loadingSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { storeUser, getUser } = useUser();
  const { goBack } = useNavigation();

  const [_, googleResponse, googleAuth] = Google.useAuthRequest({
    androidClientId:
      "133962004685-73nu5ro6io492rsp9gp42b9in0i59ua1.apps.googleusercontent.com",
    iosClientId:
      "133962004685-4ggekged7pj7ph3k373pk7rcmm4u3h8p.apps.googleusercontent.com",
    clientId:
      "133962004685-98fhg9tjq0pjlt96cjil9onuj7ghboqo.apps.googleusercontent.com",
  });

  useEffect(() => {
    async function loginUserWithGoogle(access_token: string) {
      try {
        const user = await AuthService.googleLoginOrRegister(access_token);
        handleSignInUser(user);
      } catch (error) {
        handleAuthError();
      }
    }

    if (googleResponse?.type === "success") {
      const { access_token } = googleResponse.params;
      loginUserWithGoogle(access_token);
    }
  }, [googleResponse]);

  const handleSignInUser = (user?: User | null) => {
    if (user) {
      storeUser(user);
      //goBack();
    }
  };

  const handleAuthError = () => alert("Unable to authorize");

  return { googleAuth };
};
