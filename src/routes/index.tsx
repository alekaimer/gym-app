import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeRoutes } from "./home.routes";
import { SignInRoutes } from "./signIn.routes";

export type MainRoutesParams = {
  HomeRoutes: undefined;
  SignInRoutes: undefined;
};

export function MainRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
          gestureDirection: "horizontal",

        }}
      >
        <Screen name="SignInRoutes" component={SignInRoutes} />
        <Screen name="HomeRoutes" component={HomeRoutes} />
      </Navigator>
    </NavigationContainer>
  );
}
