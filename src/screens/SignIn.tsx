import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Icon,
  Input,
  Pressable,
  Stack,
  WarningOutlineIcon,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { useAuth } from "@hooks/useAuth";

export function SignIn() {
  const { navigate } = useNavigation();
  const { loading, signInApi, user } = useAuth();

  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await signInApi(email);

    if (response.error) {
      setError(true);
      // console.log(response.message);
    } else {
      setError(false);
      // console.log(response.data);
      navigate("HomeRoutes");
    }
  };

  return (
    <Center flex="1">
      <Box w="75%" mb={6}>
        <Heading fontWeight="medium">Olá!</Heading>
        <Heading size="md" color="muted.400" fontWeight="medium">
          Faça seu login para continuar!
        </Heading>
      </Box>

      <Stack space={4} w="100%" alignItems="center">
        <FormControl isInvalid={error} w="75%" maxW="300px">
          <FormControl.Label>E-mail</FormControl.Label>
          <Input
            w={{
              // base: "75%",
              md: "25%",
            }}
            _invalid={{
              borderColor: "red.500",
            }}
            bgColor="white"
            InputLeftElement={
              <Icon
                as={MaterialIcons}
                name="person"
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Digite seu -mail"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />

          <FormControl.Label>Senha</FormControl.Label>
          <Input
            w={{
              // base: "75%",
              md: "25%",
            }}
            _invalid={{
              borderColor: "red.500",
            }}
            type={show ? "text" : "password"}
            bgColor="white"
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Digite sua senha"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />

          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Dados incorretos. Tente novamente.
          </FormControl.ErrorMessage>

          <Button mt={8} onPress={handleLogin} isLoading={loading}>
            Entrar
          </Button>
        </FormControl>
      </Stack>

      <Box mt={4} w="75%">
        <Button
          bgColor="gray.200"
          variant="outline"
          onPress={() => navigate("SocialSignIn")}
        >
          Quero me logar com minha conta Google
        </Button>
      </Box>

      <Box mt={8}>
        <Button
          variant="link"
          p="1"
          size="sm"
          onPress={() => navigate("ForgotPassword")}
        >
          Esqueci minha senha
        </Button>
        <Button
          variant="link"
          p="1"
          size="sm"
          onPress={() => navigate("RegisterNewUser")}
        >
          Quero me cadastrar!
        </Button>
        <Button variant="link" p="1" size="sm" onPress={() => navigate("Help")}>
          Precisa de ajuda?
        </Button>
      </Box>
    </Center>
  );
}
