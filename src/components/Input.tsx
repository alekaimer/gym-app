import React from "react";
import { Input as InputNativeBase, IInputProps } from "native-base";

export function Input({ ...props }: IInputProps) {
  return (
    <InputNativeBase
      bg="gray.700"
      h={14}
      px={4}
      borderWidth={0}
      fontSize="md"
      color="white"
      fontFamily="body"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
        bg: "gray.700",
      }}
      {...props}
    />
  );
}
