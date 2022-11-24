import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeRoutes } from "./home.routes";
import { Menu } from "@screens/Menu";

export type BottomTabParams = {
  HomeRoutes: undefined;
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
        <Screen name="HomeRoutes" component={HomeRoutes} />
        <Screen name="HomeMenuRoutes" component={Menu} />
      </Navigator>
    </NavigationContainer>
  );
}
