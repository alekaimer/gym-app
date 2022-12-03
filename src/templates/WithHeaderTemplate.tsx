import React from "react";
import { Box } from "native-base";
import Header from "@components/Header";
import { HomeHeader } from "@components/HomeHeader";

function WithHeaderTemplate({ children }: { children: React.ReactNode }) {

  return (
    <Box flex="1" bgColor="gray.400" p={0}>
      <HomeHeader safeAreaTop />
      {/* <Header />
      <Box flex="1" bgColor="white" p={0}>
        {children}
      </Box> */}
    </Box>
  );
}

export default WithHeaderTemplate;
