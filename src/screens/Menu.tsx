import React from "react";
import { Center, Heading, ScrollView, VStack, useTheme } from "native-base";
import { DefaultTemplate } from "@templates/DefaultTemplate";

export function Menu() {
  const { colors } = useTheme();
  return (
    <DefaultTemplate safeAreaTop>
      <ScrollView w={"full"} h="80">
        <Center mt="3" mb="4">
          <Heading fontSize="xl">Cyan</Heading>
        </Center>
        <VStack flex="1">
          {Object.keys(colors.cyan).map((key, index) => {
            if (index >= 1 && index <= 5)
              return (
                <Center py="4" bg={`cyan.${key}`} key={key}>
                  {key}
                </Center>
              );
          })}
        </VStack>
        <Center mt="8" mb="4">
          <Heading fontSize="xl">Yellow</Heading>
        </Center>
        <VStack flex="1">
          {Object.keys(colors.cyan).map((key, index) => {
            if (index >= 1 && index <= 5)
              return (
                <Center py="4" bg={`yellow.${key}`} key={key}>
                  {key}
                </Center>
              );
          })}
        </VStack>
        <Center mt="8" mb="4">
          <Heading fontSize="xl"> Violet</Heading>
        </Center>
        <VStack flex="1">
          {Object.keys(colors.violet).map((key, index) => {
            if (index >= 1 && index <= 5)
              return (
                <Center py="4" bg={`violet.${key}`} key={key}>
                  {key}
                </Center>
              );
          })}
        </VStack>
      </ScrollView>
    </DefaultTemplate>
  );
}
