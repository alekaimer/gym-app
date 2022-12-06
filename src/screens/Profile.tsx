import React, { useEffect } from "react";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { WithHeaderTemplate } from "@templates/WithHeaderTemplate";
import { UserPhoto } from "@components/UserPhoto";
import { Alert, Platform, TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import * as ImagePicker from "expo-image-picker";

const PHOTO_SIZE = 33;

export function Profile() {
  const [userPhoto, setUserPhoto] = React.useState<string | null>(null);

  async function handleUserPhotoSelect() {
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

    setUserPhoto(result.uri);
    return result;
  }

  useEffect(() => {
    // handleUserPhotoSelect();
  }, []);

  return (
    <WithHeaderTemplate title="Perfil">
      <ScrollView>
        <Center px={10} mt={6}>
          <Skeleton
            isLoaded={true}
            startColor="gray.300"
            endColor="gray.400"
            w={PHOTO_SIZE}
            h={PHOTO_SIZE}
            rounded="full"
          >
            <UserPhoto
              source={{
                uri: userPhoto || "https://github.com/alekaimer.png",
              }}
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

          <Input
            placeholder="Nome"
            bg="gray.600"
            mb={4}
            value="Alexandre Kaimer"
          />

          <Input
            placeholder="E-mail"
            bg="gray.600"
            value="alexandre@a2softhouse.com.br"
            isDisabled
          />
        </Center>

        <VStack px={10} mt={6} mb={9}>
          <Heading mt={8} mb={4} size="sm" color="gray.200">
            Alterar senha
          </Heading>

          <Input
            placeholder="Senha atual"
            bg="gray.600"
            mb={4}
            secureTextEntry
          />

          <Input
            placeholder="Nova senha"
            bg="gray.600"
            mb={4}
            secureTextEntry
          />

          <Input
            placeholder="Confirme sua nova senha"
            bg="gray.600"
            mb={4}
            secureTextEntry
          />

          <Button title="Atualizar" mt={4} />
        </VStack>
      </ScrollView>
    </WithHeaderTemplate>
  );
}
