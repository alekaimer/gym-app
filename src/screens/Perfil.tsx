import React from "react";
import {
  Center,
  Badge,
  Heading,
} from "native-base";
import { StackTemplate } from "@templates/StackTemplate";

export function Perfil() {
  return (
    <StackTemplate title="Perfil">
      <Center flex={1}>
        <Heading>Perfil Screen</Heading>
      </Center>
    </StackTemplate>
  );
}
