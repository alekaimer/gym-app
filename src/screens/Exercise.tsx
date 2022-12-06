import React from "react";
import { Center, Heading } from "native-base";
import { DefaultTemplate } from "@templates/DefaultTemplate";

export function Exercise() {
  return (
    <DefaultTemplate>
      <Center flex={1}>
        <Heading>Exercise Screen</Heading>
      </Center>
    </DefaultTemplate>
  );
}
