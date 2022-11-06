import { Center, Text } from "native-base";
import React from "react";

import Logo from '../assets/logo.svg'

function SignIn() {
  return (
    <Center flex={1} bgColor="gray.900">
      <Logo width={212} height={40} />
      <Text color="yellow.500" fontSize={24}>
        SignIn
      </Text>
    </Center>
  );
}

export default SignIn;
