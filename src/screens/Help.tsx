import React from "react";
import { Button, Center, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function Help() {
  const { navigate } = useNavigation();
  return (
      <Center flex="1">
        <Heading>Help Screen</Heading>
        <Button variant="link" onPress={() => navigate("SignIn")}>SignIn Screen</Button>
      </Center>
  );
}
