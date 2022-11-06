import { Center, Text, Icon } from "native-base";
import React from "react";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons";

function SignIn() {
  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />

      <Button
        title={"Entrar"}
        leftIcon={
          <Icon as={Fontisto} name={"google"} color={"white"} size={"sm"} />
        }
        type="secondary"
        mt={20}
        mb={5}
      />

      <Text color={"white"} textAlign={"center"}>
        Não utilizamos nenhuma informação além{"\n"}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}

export default SignIn;
