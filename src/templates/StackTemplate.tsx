import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import BodySvg from "@assets/body.svg";

interface StackTemplateProps {
  title: string;
  children: React.ReactNode;
  goBackButtonShow?: boolean;
}

export function StackTemplate({ title, children }: StackTemplateProps) {
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return (
    <VStack flex="1">
      <VStack bgColor="gray.600" px={8} pt={4} pb={8} safeAreaTop>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={MaterialIcons}
            name="arrow-back-ios"
            color="green.500"
            size="xl"
          />
        </TouchableOpacity>

        <HStack mt={4} justifyContent="space-between">
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            {title}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="gray.200" ml={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>
      
      <Box flex="1">{children}</Box>
    </VStack>
  );
}
