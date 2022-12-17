import { useState } from "react";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import defaultUserPhoto from "@assets/userPhotoDefault.png";
import { WithHeaderTemplate } from "@templates/WithHeaderTemplate";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  oldPassword: yup
    .string()
    .required("E-mail é obrigatório")
    .min(6, "Senha precisa ter no mínimo 6 caracteres"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha precisa ter no mínimo 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirmar a senha é obrigatório")
    .oneOf([yup.ref("password"), null], "Senhas não conferem"),
});

export function Profile() {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    // optional default values
    defaultValues: {
      name: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const { user } = useAuth();

  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (result.cancelled) {
        return;
      }

      if (result.uri) {
        const photoInfo = await FileSystem.getInfoAsync(result.uri);

        if (photoInfo.size && photoInfo.size > 1024 * (1024 * 5)) {
          toast.show({
            title: "A imagem deve ter no máximo 5MB.",
            bgColor: "red.500",
            placement: "top",
          });
          // Alert.alert("A imagem deve ter no máximo 5MB.");
          return;
        }

        setUserPhoto(result.uri);
      }
    } catch (error) {
      toast.show({
        title: "Não foi possível acessar a galeria de fotos.",
        bgColor: "red.500",
        placement: "top",
      });
      // Alert.alert("Não foi possível acessar a galeria de fotos.");
    } finally {
      setPhotoIsLoading(false);
    }
  }

  function handleProfileUpdate(data: FormDataProps) {
    console.log(data);

    if (false) {
      //para erro

      toast.show({
        title: "Erro na atualização do perfil!",
        bgColor: "red.500",
        placement: "top",
      });
      return;
    }

    toast.show({
      title: "Perfil atualizado!",
      bgColor: "green.500",
      placement: "top",
    });
  }

  return (
    <WithHeaderTemplate title="Perfil">
      <ScrollView>
        <Center px={10} mt={6}>
          <Skeleton
            isLoaded={!photoIsLoading}
            startColor="gray.300"
            endColor="gray.400"
            w={PHOTO_SIZE}
            h={PHOTO_SIZE}
            rounded="full"
          >
            <UserPhoto
              source={userPhoto ? { uri: userPhoto } : defaultUserPhoto}
              alt="Imagem do usuário"
              size={PHOTO_SIZE}
            />
          </Skeleton>

          <TouchableOpacity>
            <Text
              color="green.500"
              fontWeight="bold"
              mt={2}
              mb={8}
              onPress={handleUserPhotoSelect}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                autoCapitalize="words"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Input
            mt={4}
            placeholder="E-mail"
            bg="gray.600"
            value={user.email}
            isDisabled
          />
        </Center>

        <VStack px={10} mt={6} mb={9}>
          <Heading mt={8} mb={4} size="sm" color="gray.200">
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha atual"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.oldPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nova senha"
                bg="gray.600"
                mt={4}
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
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme sua nova senha"
                bg="gray.600"
                mt={4}
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={8}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </VStack>
      </ScrollView>
    </WithHeaderTemplate>
  );
}
