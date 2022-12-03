import { IImageProps, Image } from "native-base";
import React from "react";

type UserImageProps = IImageProps & {
  size?: number;
};

export function UserPhoto({ size, ...rest }: UserImageProps) {
  return (
    <Image
      h={size}
      w={size}
      rounded="full"
      borderWidth={2}
      borderColor="white"
      {...rest}
    />
  );
}
