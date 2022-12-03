import React from "react";
import { Center, Heading } from "native-base";
import { DefaultTemplate } from "@templates/DefaultTemplate";

export function Profile() {
  return (
    <DefaultTemplate safeAreaTop>
      <Center flex={1}>
        <Heading color="gray.100">Profile Screen</Heading>
      </Center>
    </DefaultTemplate>
  );
}
