import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";
import { SocialSignIn } from "@screens/SocialSignIn";
import { ForgotPassword } from "@screens/ForgotPassword";
import { SignUp } from "@screens/SignUp";
import { Help } from "@screens/Help";

export type AuthRouterParams = {
  SignIn: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  Help: undefined;
  SocialSignIn: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRouterParams>;

const { Navigator, Screen, Group } = createNativeStackNavigator<AuthRouterParams>();

export function SignInRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Group>
        <Screen name="SignIn" component={SignIn} />

        <Screen name="SocialSignIn" component={SocialSignIn} />

        <Screen name="ForgotPassword" component={ForgotPassword} />

        <Screen name="SignUp" component={SignUp} />

        <Screen name="Help" component={Help} />
      </Group>
    </Navigator>
  );
}
