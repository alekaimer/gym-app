import { Center, Text } from "native-base";
import React from "react";
import { StatusBar } from "react-native";

function SignIn(props) {
  return (
    <Center flex={1} bgColor="gray.900">
      <Text color="yellow.500" fontSize={24}>
        Tuddu Seller Center
      </Text>
      <Text color="yellow.500" fontSize={24}>
        SignIn
      </Text>
    </Center>
  );
}

export default SignIn;
