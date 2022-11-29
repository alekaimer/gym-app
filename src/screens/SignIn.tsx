import React from "react";
import { Badge, Button, Center, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const { navigate } = useNavigation();

  return (
    <Center flex="1">
      <Heading>SignIn Screen</Heading>
      <Button onPress={() => navigate("HomeRoutes")}>Home Screen</Button>
      <Button onPress={() => navigate("SocialSignIn")}>SocialSignIn Screen</Button>
      <Button onPress={() => navigate("ForgotPassword")}>ForgotPassword Screen</Button>
      <Button onPress={() => navigate("RegisterNewUser")}>RegisterNewUser Screen</Button>
      <Button onPress={() => navigate("Help")}>Help Screen</Button>
    </Center>
  );
}
