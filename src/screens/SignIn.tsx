import React from "react";
import { Badge, Button, Center } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const { navigate } = useNavigation();

  return (
    <Center flex="1">
      <Badge>SignIn</Badge>
      <Button onPress={() => navigate("HomeRoutes")}>Home Screen</Button>
    </Center>
  );
}
