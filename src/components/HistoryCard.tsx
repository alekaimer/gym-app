import React from "react";
import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { HistoryDTO } from "@dtos/HistoryDTO";

type HistoryCardProps = {
  data: HistoryDTO
};

export const HistoryCard = ({ data, ...rest }: HistoryCardProps) => {
  return (
    <HStack
      bgColor="gray.600"
      px={5}
      py={4}
      mb={3}
      rounded="md"
      alignItems="center"
    >
      <VStack flex={1}>
        <Heading
          color="white"
          fontSize="md"
          textTransform="capitalize"
          numberOfLines={1}
        >
          {data.group}
        </Heading>

        <Text color="gray.200" fontSize="lg" numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>

      <Text color="gray.300">{data.hour}</Text>
    </HStack>
  );
};
