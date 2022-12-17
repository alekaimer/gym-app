import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme, View } from "native-base";
import { HomeRoutes } from "./home.routes";
import { SignInRoutes } from "./auth.routes";
import { useAuth } from "@hooks/useAuth";
import Loading from "@components/Loading";

export type MainRoutesParams = {
  HomeRoutes: undefined;
  SignInRoutes: undefined;
};

export function MainRoutes() {
  // const { Navigator, Screen } = createNativeStackNavigator<MainRoutesParams>();

  const { colors } = useTheme();
  const { user, isLoadingUserStorage } = useAuth();

  const navigationTheme = DefaultTheme;
  navigationTheme.colors.background = colors.gray[700];

  if (isLoadingUserStorage) {
    return <Loading />
  }

  return (
    <View flex={1} bgColor="gray.700">
      <NavigationContainer theme={navigationTheme}>
        {/* <Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        >
          <Screen name="SignInRoutes" component={SignInRoutes} />
          <Screen name="HomeRoutes" component={HomeRoutes} />
        </Navigator> */}
        {user.id ? <HomeRoutes /> : <SignInRoutes />}
      </NavigationContainer>
    </View>
  );
}
