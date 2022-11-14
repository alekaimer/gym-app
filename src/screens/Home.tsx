import { Center, ScrollView, Heading, VStack, useTheme } from "native-base";
import React from "react";

import WithHeaderTemplate from "@templates/WithHeaderTemplate";

function Home() {
  const { colors } = useTheme();
  return (
    <WithHeaderTemplate>
      <ScrollView w={"full"} h="80">
        <Center mt="3" mb="4">
          <Heading fontSize="xl">Cyan</Heading>
        </Center>
        <VStack flex="1">
          {Object.keys(colors.cyan).map((key, index) => {
            if (index >= 1 && index <= 5)
              return (
                <Center py="4" bg={`cyan.${key}`}>
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
                <Center py="4" bg={`yellow.${key}`}>
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
                <Center py="4" bg={`violet.${key}`}>
                  {key}
                </Center>
              );
          })}
        </VStack>
      </ScrollView>
    </WithHeaderTemplate>
  );
}

export default Home;
