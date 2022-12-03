import { IImageProps, Image } from "native-base";
import React from "react";

type UserImageProps = IImageProps & {
  size?: number;
};

export function UserPhoto({ size = 24, ...rest }: UserImageProps) {
  return (
    <Image
      h={size}
      w={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  );
}
