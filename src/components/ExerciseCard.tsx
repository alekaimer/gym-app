import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { Entypo } from "@expo/vector-icons";

import { ExercisesDTO } from "@dtos/ExercisesDTO";
import { api } from "@services/api";

type ExerciseCardProps = TouchableOpacityProps & {
  data: ExercisesDTO;
};

export const ExerciseCard = ({ data, ...rest }: ExerciseCardProps) => {
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
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
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
            {data.name}
          </Heading>

          <Text color="gray.200" fontSize="sm" numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
};
