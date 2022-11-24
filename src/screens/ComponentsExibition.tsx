import React from "react";
import { Center, useTheme, Badge } from "native-base";
import { StackTemplate } from "@templates/StackTemplate";

export function ComponentsExibition() {
  const { colors } = useTheme();
  return (
    <StackTemplate title="Components Exibition">
      <Center>
        <Badge width={"48"}>badge default</Badge>
      </Center>
    </StackTemplate>
  );
}
