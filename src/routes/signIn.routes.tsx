import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";
import { SocialSignIn } from "@screens/SocialSignIn";
import { ForgotPassword } from "@screens/ForgotPassword";
import { RegisterNewUser } from "@screens/RegisterNewUser";
import { Help } from "@screens/Help";

export type SignInRouterParams = {
  SignIn: undefined;
  ForgotPassword: undefined;
  RegisterNewUser: undefined;
  Help: undefined;
  SocialSignIn: undefined;
};

interface NavigationTabProps {
  color: string;
}

const { Navigator, Screen, Group } = createNativeStackNavigator<SignInRouterParams>();

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

        <Screen name="RegisterNewUser" component={RegisterNewUser} />

        <Screen name="Help" component={Help} />
      </Group>
    </Navigator>
  );
}
