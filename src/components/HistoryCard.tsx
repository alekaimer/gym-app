import React from "react";
import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";


type HistoryCardProps = {};

export const HistoryCard = ({ ...rest }: HistoryCardProps) => {
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
        <Heading color="white" fontSize="md" textTransform="capitalize">
          Costas
        </Heading>

        <Text color="gray.200" fontSize="lg" numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>

      <Text color="gray.300">08:56</Text>
    </HStack>
  );
};
