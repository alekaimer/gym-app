import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme, View } from "native-base";
import { HomeRoutes } from "./home.routes";
import { SignInRoutes } from "./auth.routes";

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
    <View flex={1} bgColor="gray.700" >
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
    </View>
  );
}
