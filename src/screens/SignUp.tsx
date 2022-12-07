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

export function SignUp() {
  const { navigate } = useNavigation();
  const { control } = useForm();

  function handleSignUp() {
    console.log("> control: ", JSON.stringify(control, null, 2));
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
            render={({ field: { onChange, value } }) => (
              <Input
                mb={4}
                placeholder="Nome"
                autoCorrect={false}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                mb={4}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                mb={4}
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                mb={4}
                placeholder="Confirme sua senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Button title="Criar e acessar" onPress={handleSignUp} />
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
