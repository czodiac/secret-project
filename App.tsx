import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/components/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "./src/components/profile";
import { Button } from "react-native-paper";
import { View, Text } from "react-native";
import { Header } from "./src/components/header";
import LoginModal from "./src/components/modal/loginModal";
const Stack = createNativeStackNavigator();

export default function App() {
  const ref = React.useRef(null);
  const changeScreen = (screenName) => {
    ref.current && ref.current.navigate(screenName);
  };
  return (
    <Provider store={store}>
      <NavigationContainer ref={ref}>
        <Header changeScreen={changeScreen} />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <LoginModal />
    </Provider>
  );
}
