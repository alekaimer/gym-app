import React from "react";
import { Badge, Center, Button, Heading } from "native-base";
import WithHeaderTemplate from "@templates/WithHeaderTemplate";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const { navigate } = useNavigation();
  return (
    <WithHeaderTemplate>
      <Center flex="1">
        <Heading>Home</Heading>
        <Button onPress={() => navigate("SignInRoutes")}>SignIn Screen</Button>
      </Center>
    </WithHeaderTemplate>
  );
}

export default Home;
