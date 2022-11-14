import Header from "@components/Header";
import { Box } from "native-base";
import React from "react";

function WithHeaderTemplate({ children }: { children: React.ReactNode }) {
  return (
    <Box flex="1" bgColor="primary.500" p={0} safeAreaTop>
      <Header />
      <Box flex="1" bgColor="white" p={4}>{children}</Box>
    </Box>
  );
}

export default WithHeaderTemplate;
