import React from "react";
import {
  Center,
  Badge,
  Heading,
} from "native-base";
import { StackTemplate } from "@templates/StackTemplate";

export function Exercise() {
  return (
    <StackTemplate title="Exercise">
      <Center flex={1}>
        <Heading>Exercise Screen</Heading>
      </Center>
    </StackTemplate>
  );
}
