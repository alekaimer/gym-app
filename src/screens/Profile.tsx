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
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

const PHOTO_SIZE = 33;
const MAX_UPLOADED_FILE_SIZE = 5;

type FormDataProps = {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  oldPassword: yup
    .string()
    .nullable()
    .min(3, "Senha precisa ter no mínimo 6 caracteres")
    .transform((value) => (value === "" ? null : value)),
  password: yup
    .string()
    .min(6, "Senha precisa ter no mínimo 6 caracteres")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  confirmPassword: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .oneOf([yup.ref("password"), null], "Senhas não conferem")
    .when("password", {
      is: (val: any) => val,
      then: yup
        .string()
        .nullable()
        .required("Informe a confirmação de senha")
        .transform((value) => (value === "" ? null : value)),
    }),
});

export function Profile() {
  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    // optional default values
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(schema),
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.cancelled) {
        return;
      }

      if (photoSelected.uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.uri);

        if (
          photoInfo.size &&
          photoInfo.size > 1024 * (1024 * MAX_UPLOADED_FILE_SIZE)
        ) {
          toast.show({
            title: `A imagem deve ter no máximo ${MAX_UPLOADED_FILE_SIZE}MB.`,
            bgColor: "red.500",
            placement: "top",
          });
          return;
        }

        // setUserPhoto(photoSelected.uri);
        const fileExtension = photoSelected.uri.split(".").pop();
        const photoFile = {
          name: `${(user.name).replace(/ /, '')}.${fileExtension}`,
          type: `${photoSelected.type}/${fileExtension}`,
          uri: photoSelected.uri,
        } as any;

        const userFormUploadedPhoto = new FormData();
        userFormUploadedPhoto.append("avatar", photoFile);

        const avatarUpdatedResponse = await api.patch("/users/avatar", userFormUploadedPhoto, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.show({
          title: "Foto atualizada com sucesso!",
          bgColor: "green.700",
          placement: "top",
        });

        await updateUserProfile({
          ...user,
          avatar: avatarUpdatedResponse.data.avatar,
        });
      }
    } catch (error) {
      toast.show({
        title: "Não foi possível acessar a galeria de fotos.",
        bgColor: "red.500",
        placement: "top",
      });
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);
      await api.put("/users", {
        name: data.name,
        old_password: data.oldPassword,
        password: data.password,
      });
      await updateUserProfile({
        ...user,
        name: data.name,
      });
      toast.show({
        title: "Perfil atualilzado com sucesso!",
        bgColor: "green.700",
        placement: "top",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar os dados. Tente novamente mais tarde.";
      toast.show({
        title,
        bgColor: "red.500",
        placement: "top",
      });
    } finally {
      setIsUpdating(false);
    }
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
              source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : defaultUserPhoto}
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

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="E-mail"
                bg="gray.600"
                value={user.email}
                isDisabled
              />
            )}
          />
        </Center>

        <VStack px={10} mt={6} mb={9}>
          <Heading mt={8} mb={4} size="sm" color="gray.200">
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha atual"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.oldPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nova senha"
                bg="gray.600"
                mt={4}
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme sua nova senha"
                bg="gray.600"
                mt={4}
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={8}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </VStack>
      </ScrollView>
    </WithHeaderTemplate>
  );
}
