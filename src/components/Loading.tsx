import React from "react";
import { Center, Spinner } from "native-base";

function Loading() {
  return (
    <Center flex={1} bgColor="gray.700">
      <Spinner color="white" />
    </Center>
  );
}

export default Loading;
