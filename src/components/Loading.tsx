import React from "react";
import { Center, Spinner } from "native-base";

function Loading() {
  return (
    <Center flex={1} bgColor="gray.900">
      <Spinner color="yellow.500" />
    </Center>
  );
}

export default Loading;
