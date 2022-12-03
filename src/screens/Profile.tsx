import React from "react";
import { Center, Heading } from "native-base";
import { WithHeaderTemplate } from "@templates/WithHeaderTemplate";

export function Profile() {
  return (
    <WithHeaderTemplate title="Profile">
      <Center flex={1}>
        <Heading color="gray.100">Profile Screen</Heading>
      </Center>
    </WithHeaderTemplate>
  );
}
