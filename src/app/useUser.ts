import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "../common/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getAuthUser, setAuthUser, setAuthUserUpdated, getAuthUserUpdated } from '../slices/authSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { logAndAlertError } from '../utils/handleError';
import * as Google from "expo-auth-session/providers/google";
import AuthService from "../services/authService";
import { setLoginModalStatus } from "../slices/modalSlice";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(getAuthUser);
  const authUserUpdated = useAppSelector(getAuthUserUpdated);
  const keyUser = 'user';

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        dispatch(setAuthUserUpdated(true)); // Set this to true so that below userEffect doesn't get called multiple times. (setAuthUser dispatch call below updates "authUser" which triggers storeUserInAppStorage call.)
        dispatch(setAuthUser(user)); // If user exists in local storage, add it to Redux store.
      }
    });
  }, []);

  useEffect(() => {
    // When authUser is created from loginUser, store it in local storage.
    if (!authUserUpdated && authUser) {
      storeUserInAppStorage(authUser);
    }
  }, [authUser]);

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
        const user = await AuthService.getGoogleProfile(access_token);
        if (user) {
          dispatch(setAuthUser(user)); // Update Redux store's user.
          storeUserInAppStorage(user);
          dispatch(setLoginModalStatus(false)); // Close login modal.
        }
      } catch (err: any) {
        logAndAlertError('loginUserWithGoogle', 'Unable to store user info in local app storage for Google login.', err);
      }
    }

    if (googleResponse?.type === "success") {
      const { access_token } = googleResponse.params;
      loginUserWithGoogle(access_token);
    }
  }, [googleResponse]);

  const storeUserInAppStorage = async(user: any) => {
    try {
      let stringUser = JSON.stringify(user);
      if (Platform.OS === 'web') {
        // To store object value: const jsonValue = JSON.stringify(value); 
        await AsyncStorage.setItem(keyUser, stringUser);
        console.log('User for web set');
      } else {
        await SecureStore.setItemAsync(keyUser, stringUser);
        console.log('User for ' + Platform.OS + ' set');
      }
    } catch (e) {
      logAndAlertError('storeUserInAppStorage', 'Unable to store user info in local app storage', e);
    }
  };

  const getUser = async () => {
    try {
      console.log('User from Redux store: ' + JSON.stringify(authUser));
      let jsonValue = null;
      if (Platform.OS === 'web') {
        jsonValue = await AsyncStorage.getItem(keyUser);
        console.log('User for web: ' + jsonValue);
      } else {
        jsonValue = await SecureStore.getItemAsync(keyUser);
        console.log('User for mobile: ' + jsonValue);
      }
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch(e) {
      logAndAlertError('getUser', undefined, e);
    }
  };

  const logoutUser = async () => {
      console.log('Logout started');
      try {
        dispatch(setAuthUserUpdated(false));
        dispatch(setAuthUser(undefined)); // Delete auth user from Redux store.
        if (Platform.OS === 'web') {
          await AsyncStorage.removeItem(keyUser);
          console.log('Successfully logged out for web.');
        } else {
          SecureStore.deleteItemAsync(keyUser);
          console.log('Successfully logged out for mobile.');
        }
      } catch(e) {
        logAndAlertError('logoutUser', undefined, e);
      }
  };

  return {
    logoutUser,
    getUser,
    googleAuth
  };
};
