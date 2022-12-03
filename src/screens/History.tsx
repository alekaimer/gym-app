import React from "react";
import { Center, Heading, ScrollView, VStack, useTheme } from "native-base";
import { WithHeaderTemplate } from "@templates/WithHeaderTemplate";

export function History() {
  const { colors } = useTheme();
  return (
    <WithHeaderTemplate>
      <Center flex={1}>
        <Heading color="gray.100">History Screen</Heading>
      </Center>
    </WithHeaderTemplate>
  );
}
