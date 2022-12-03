import React from "react";
import { Center, Heading, HStack, ICenterProps } from "native-base";

type HeaderProps = ICenterProps & {}

export function Header({ ...props }: HeaderProps) {

  return (
    <Center bg="gray.600" pt={6} pb={5} px={8} alignItems="center" {...props}>
      <Heading color="gray.100" size="md">
        Alexandre
      </Heading>
    </Center>
  );
}
