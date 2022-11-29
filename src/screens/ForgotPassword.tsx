import React from "react";
import { Badge, Center } from "native-base";
import WithHeaderTemplate from "@templates/WithHeaderTemplate";

export function ForgotPassword() {

  return (
    <WithHeaderTemplate>
      <Center flex="1">
        <Badge >ForgotPassword</Badge>
      </Center>
    </WithHeaderTemplate>
  );
}
