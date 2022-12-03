import { Heading, HStack, Icon, Text, VStack } from "native-base";
import React from "react";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export function HomeHeader({ ...props }) {
  const { navigate } = useNavigation();

  return (
    <HStack bg="gray.600" pt={5} pb={5} px={8} alignItems="center" {...props}>
      <UserPhoto
        source={{
          uri: "https://github.com/alekaimer.png",
        }}
        alt="Imagem do usuário"
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" size="md">
          Alexandre
        </Heading>
      </VStack>

      <TouchableOpacity onPress={() => navigate("SignInRoutes")}>
        <Icon
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  );
}
