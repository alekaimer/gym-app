import React from "react";
import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
  useToast,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { api } from "@services/api";
import { MainRoutesParams } from "@routes/index";

type FormDataProps = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail é obrigatório")
    .email("E-mail inválido!"),
  password: yup.string().required("Senha é obrigatória"),
});

export function SignIn() {
  const toast = useToast();

  const { navigate, reset } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    // optional default values
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });


  function goToRouteAndReset(route: keyof MainRoutesParams) {
    reset({
      index: 0,
      routes: [{ name: route }],
    });
  }

  async function handleLogin({ email, password }: FormDataProps) {
    try {
      await api.post("/sessions", { email, password });
      goToRouteAndReset("HomeRoutes")
    } catch (error) {
      toast.show({
        title: (error as any).message || "Erro ao fazer login",
        duration: 5000,
        placement: "top",
        bgColor: "red.500",
      });
    }
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

        <Center my={24}>
          <LogoSvg />
          <Text color={"gray.100"} fontSize="sm">
            Treine sua mente e seu corpo.
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" fontFamily="heading" mb={8}>
            Acesse sua conta
          </Heading>
        </Center>

        <Center>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="Senha"
                secureTextEntry
                onSubmitEditing={handleSubmit(handleLogin)}
                returnKeyType="send"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button mt={4} title="Acessar" onPress={handleSubmit(handleLogin)} />
        </Center>

        <Center mt={24} justifyContent="center">
          <Text mb={3} color="gray.100" fontSize="sm" textAlign="center">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={() => navigate("SignUp")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
