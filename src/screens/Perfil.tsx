import React from "react";
import {
  Center,
  Badge,
} from "native-base";
import { StackTemplate } from "@templates/StackTemplate";

export function Perfil() {
  return (
    <StackTemplate title="Perfil">
      <Center>
        <Badge>in dev</Badge>
      </Center>
    </StackTemplate>
  );
}
