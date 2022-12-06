import React from "react";
import { Input as InputNativeBase, IInputProps } from "native-base";

export function Input({ ...props }: IInputProps) {
  return (
    <InputNativeBase
      h={14}
      px={4}
      fontSize="md"
      color="white"
      fontFamily="body"
      placeholderTextColor="gray.300"
      borderWidth={1}
      borderColor="gray.700"
      bg="gray.700"
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
        bg: "gray.700",
      }}
      {...props}
    />
  );
}
