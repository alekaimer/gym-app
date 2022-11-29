import { Center, Text, Icon } from "native-base";
import React from "react";

import Logo from "@assets/logo.svg";
import { Button } from "@components/Button";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button as ButtonNativeBase } from "native-base";

export function SocialSignIn() {
  const { goBack } = useNavigation();
  return (
    <Center flex={1} bgColor="gray.400" p={7}>
      <Logo width={212} height={40} />

      <Button
        type="secondary"
        title={"Entrar"}
        leftIcon={
          <Icon as={Fontisto} name={"google"} color={"white"} size={"sm"} />
        }
        mt={20}
        mb={5}
        onPress={() => {}}
      />

      <Text color={"white"} textAlign={"center"}>
        Não utilizamos nenhuma informação além{"\n"}
        do seu e-mail para criação de sua conta.
      </Text>

      <ButtonNativeBase variant="link" colorScheme="secondary" mt={10} onPress={() => goBack()}>
        Voltar
      </ButtonNativeBase>
    </Center>
  );
}
