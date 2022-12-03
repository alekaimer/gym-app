import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeRoutes } from "./home.routes";
import { SignInRoutes } from "./auth.routes";
import { useTheme } from "native-base";

export type MainRoutesParams = {
  HomeRoutes: undefined;
  SignInRoutes: undefined;
};

export function MainRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  const nativeBaseTheme = useTheme();

  const navigationTheme = DefaultTheme;
  navigationTheme.colors.background = nativeBaseTheme.colors.gray[700];

  return (
    <NavigationContainer theme={navigationTheme}>
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
