import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { Entypo } from "@expo/vector-icons";

type ExerciseCardProps = TouchableOpacityProps & {};

export const ExerciseCard = ({ ...rest }: ExerciseCardProps) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bgColor="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: "http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
          }}
          alt="Imagem do exercício"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="center"
        />
        <VStack flex={1}>
          <Heading color="white" fontSize="lg">
            Puzada frontal
          </Heading>

          <Text color="gray.200" fontSize="sm" numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
};
