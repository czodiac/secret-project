import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { Button } from "react-native-paper";
import { View, Text } from "react-native";
import { Header } from "./src/components/Header";
import LoginModal from "./src/screens/LoginModalScreen";
import * as Linking from "expo-linking";
import { Screens } from "./src/common/types";

const CutiesStack = createNativeStackNavigator<Screens>();

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Home: "Home",
      Profile: "Profile",
      User: {
        path: "user/:id",
        parse: {
          id: Number,
        },
      },
    },
  },
};

export default function App() {
  const ref = React.useRef<any>(null);
  const changeScreen = (screenName: string) => {
    ref.current && ref.current.navigate(screenName);
  };
  return (
    <Provider store={store}>
      <NavigationContainer ref={ref} linking={linking}>
        <Header changeScreen={changeScreen} />
        <CutiesStack.Navigator initialRouteName="Home">
          <CutiesStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <CutiesStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </CutiesStack.Navigator>
        <LoginModal />
      </NavigationContainer>
    </Provider>
  );
}
