import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MainRoutesParams } from "@routes/index";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { api } from "@services/api";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .required("E-mail é obrigatório")
    .email("E-mail inválido!"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha precisa ter no mínimo 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirmar a senha é obrigatório")
    .oneOf([yup.ref("  password"), null], "Senhas não conferem"),
});

export function SignUp() {
  const toast = useToast();

  const { reset } = useNavigation();

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
    resolver: yupResolver(schema),
  });

  function goToRouteAndReset(route: keyof MainRoutesParams) {
    reset({
      index: 0,
      routes: [{ name: route }],
    });
  }

  async function handleSignUp({ email, name, password }: FormDataProps) {
    try {
      await api.post("/users", { email, name, password });
      toast.show({
        title: "Conta criada com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
      goToRouteAndReset("SignInRoutes");
    } catch (error) {
      toast.show({
        title: (error as any).message || "Erro ao criar conta",
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
                placeholder="Nome"
                autoCorrect={false}
                returnKeyType="next"
                onChangeText={onChange}
                value={value || "Alexandre"}
                autoCapitalize="words"
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyLabel="next"
                returnKeyType="next"
                onChangeText={onChange}
                value={value || "alexandre@email.com"}
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
                returnKeyType="next"
                onChangeText={onChange}
                value={value || "123456"}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="Confirme sua senha"
                secureTextEntry
                onChangeText={onChange}
                value={value || "123456"}
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
            onPress={() => goToRouteAndReset("SignInRoutes")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
