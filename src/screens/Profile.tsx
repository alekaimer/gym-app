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
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
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
            placeholder="Senha antiga"
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
            placeholder="confirme a nova senha"
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
