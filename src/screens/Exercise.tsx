import React from "react";
import { Center, Heading } from "native-base";
import { DefaultTemplate } from "@templates/DefaultTemplate";
import { StackTemplate } from "@templates/StackTemplate";

export function Exercise() {
  return (
    <StackTemplate title={"Nome do exercício"}>
      <Center flex={1}>
        <Heading>Exercise Screen</Heading>
      </Center>
    </StackTemplate>
  );
}
