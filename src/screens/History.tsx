import React from "react";
import { Center, Heading, ScrollView, VStack, useTheme } from "native-base";
import { DefaultTemplate } from "@templates/DefaultTemplate";

export function History() {
  const { colors } = useTheme();
  return (
    <DefaultTemplate safeAreaTop>
      <Center flex={1}>
        <Heading color="gray.100">History Screen</Heading>
      </Center>
    </DefaultTemplate>
  );
}
