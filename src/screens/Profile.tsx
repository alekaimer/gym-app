import React from "react";
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
import { TouchableOpacity } from "react-native";

const PHOTO_SIZE = 33;

export function Profile() {
  return (
    <WithHeaderTemplate title="Perfil">
      <ScrollView>
        <Center mt={6}>
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
                uri: "https://github.com/alekaimer.png",
              }}
              alt="Imagem do usuário"
              size={PHOTO_SIZE}
            />
          </Skeleton>

          <TouchableOpacity>
            <Text color="green.500" fontWeight="bold" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>
        </Center>
      </ScrollView>
    </WithHeaderTemplate>
  );
}
