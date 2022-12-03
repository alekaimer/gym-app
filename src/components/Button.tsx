import React from "react";
import { Button as ButtonNative, Text, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  variant?: "solid" | "outline";
}

export function Button({ title, variant, ...props }: ButtonProps) {
  return (
    <ButtonNative
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      borderColor="green.500"
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      _pressed={{ bg: variant === "outline" ? "gray.500" : "green.500" }}
      _loading={{
        _spinner: {
          color: "black",
        },
      }}
      {...props}
    >
      <Text
        textTransform="uppercase"
        fontFamily="heading"
        fontSize="sm"
        color={variant === "outline" ? "green.500" : "white"}
      >
        {title}
      </Text>
    </ButtonNative>
  );
}
