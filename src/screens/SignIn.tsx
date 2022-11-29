import React, { useState, useCallback } from "react";
import {
  Badge,
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

export function SignIn() {
  const { navigate } = useNavigation();

  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 2000);
  }

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
          />

          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Dados incorretos. Tente novamente.
          </FormControl.ErrorMessage>

          <Button mt={8} onPress={() => handleLogin()} isLoading={loading}>
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
