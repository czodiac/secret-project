import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "../types/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const useUser = () => {
  const [ user, setUser ] = useState(null); // Change this to use redux store

  const storeUser = async(user: User) => {
    let stringUser = JSON.stringify(user);
    //setUser(user); // Store user data in redux store
    if (Platform.OS === 'web') {
      console.log('User for web');
      try {
        // To store object value: const jsonValue = JSON.stringify(value); 
        await AsyncStorage.setItem(
          'mykey',
          'iltae'
        );
        console.log('User for web set');
      } catch (error) {
        // Error saving data
      }
    } else {
      console.log('User for ' + Platform.OS);
      SecureStore.setItemAsync("user", stringUser);
    }
  };

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('mykey')
      console.log('User: ' + jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  const logoutUser = async () => {
    if (user) {
      setUser(null);
      SecureStore.deleteItemAsync("user");
    }
  };
  return {
    storeUser,
    logoutUser,
    getUser
  };
};
