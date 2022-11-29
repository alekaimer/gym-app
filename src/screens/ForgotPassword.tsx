import React from "react";
import { Button, Center, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackTemplate } from "@templates/StackTemplate";

export function ForgotPassword() {
  const { navigate } = useNavigation();
  return (
    <StackTemplate title="Recupere sua senha">
      <Center flex="1">
        <Heading>ForgotPassword Screen</Heading>
        <Button variant="link" onPress={() => navigate("SignIn")}>
          SignIn Screen
        </Button>
      </Center>
    </StackTemplate>
  );
}
