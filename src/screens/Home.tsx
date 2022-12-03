import React from "react";
import { Center, Heading } from "native-base";
import WithHeaderTemplate from "@templates/WithHeaderTemplate";

function Home() {
  return (
    <WithHeaderTemplate>
      <Center flex="1">
        <Heading color="gray.100">Home</Heading>
      </Center>
    </WithHeaderTemplate>
  );
}

export default Home;
