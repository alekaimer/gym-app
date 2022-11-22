import React from "react";
import { Button as ButtonNative, Text, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  type?: "primary" | "secondary";
}

export function Button({ title, type = "primary", ...rest }: ButtonProps) {
  return (
    <ButtonNative
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      bg={type === "secondary" ? "red.500" : "yellow.500"}
      _pressed={{ bg: type === "secondary" ? "red.600" : "yellow.600" }}
      _loading={{
        _spinner: {
          color: "black",
        },
      }}
      {...rest}
    >
      <Text
        textTransform="uppercase"
        fontFamily={"heading"}
        fontSize={"sm"}
        color={type === "secondary" ? "white" : "black"}
      >
        {title}
      </Text>
    </ButtonNative>
  );
}
