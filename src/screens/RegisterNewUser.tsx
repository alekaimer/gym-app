import React from "react";
import { Button, Center, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function RegisterNewUser() {
  const { navigate } = useNavigation();
  return (
      <Center flex="1">
        <Heading>RegisterNewUser</Heading>
        <Button onPress={() => navigate("SignIn")}>SignIn Screen</Button>
      </Center>
  );
}
