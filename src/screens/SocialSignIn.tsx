import { Center, Text, Icon } from "native-base";
import React from "react";

import Logo from "@assets/logo.svg";
import { Button } from "@components/Button";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function SocialSignIn() {
  const { navigate } = useNavigation();
  return (
    <Center flex={1} bgColor="gray.400" p={7}>
      <Logo width={212} height={40} />

      <Button
        title={"Entrar"}
        leftIcon={
          <Icon as={Fontisto} name={"google"} color={"white"} size={"sm"} />
        }
        type="primary"
        mt={20}
        mb={5}
        onPress={() => {}}
      />

      <Text color={"white"} textAlign={"center"}>
        Não utilizamos nenhuma informação além{"\n"}
        do seu e-mail para criação de sua conta.
      </Text>

      <Button
        title={"SignIn Screen"}
        type="secondary"
        mt={20}
        mb={5}
        onPress={() => navigate("SignIn")}
      />
    </Center>
  );
}
