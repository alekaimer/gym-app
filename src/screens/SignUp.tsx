import React, { useState } from "react";
import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
  Box,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUp() {
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    // optional default values
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function handleSignUp(data: FormDataProps) {
    console.log("> data: ", data);
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsHorizontalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        />

        <Center my={20}>
          <LogoSvg />
          <Text color={"gray.100"} fontSize="sm">
            Treine sua mente e seu corpo.
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" fontFamily="heading" mb={8}>
            Crie sua conta
          </Heading>
        </Center>

        <Center>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Nome obrigatório",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                autoCorrect={false}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: "E-mail obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "No mínimo 6 caracteres",
              },
              maxLength: {
                value: 12,
                message: "No máximo 12 caracteres",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Confirmar a senha é obrigatório",
              minLength: {
                value: 6,
                message: "No mínimo 6 caracteres",
              },
              maxLength: {
                value: 12,
                message: "No máximo 12 caracteres",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="Confirme sua senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            mt={8}
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Center mt={12} justifyContent="center">
          <Button
            title="Voltar para o login"
            variant="outline"
            onPress={() => navigate("SignIn")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
