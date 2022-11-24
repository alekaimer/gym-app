import React from "react";
import { Badge, Center } from "native-base";
import WithHeaderTemplate from "@templates/WithHeaderTemplate";

function Home() {

  return (
    <WithHeaderTemplate>
      <Center flex="1">
        <Badge >Home</Badge>
      </Center>
    </WithHeaderTemplate>
  );
}

export default Home;
