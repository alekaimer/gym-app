import React from "react";
import { Input as InputNativeBase, IInputProps, FormControl } from "native-base";

type InputProps = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...props }: InputProps) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid}>
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
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        {...props}
      />

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
