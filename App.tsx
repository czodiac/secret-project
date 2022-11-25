import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import Home from "./src/components/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "./src/components/profile";
import { Button } from "react-native-paper";
import { View, Text } from "react-native";
import { Header } from "./src/components/header";
import LoginModal from "./src/components/modal/loginModal";
import * as Linking from "expo-linking";
import { StackParams } from "./src/common/stackParams";

const CutiesStack = createNativeStackNavigator<StackParams>();

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
            component={Home}
            options={{ headerShown: false }}
          />
          <CutiesStack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
        </CutiesStack.Navigator>
      </NavigationContainer>
      <LoginModal />
    </Provider>
  );
}
