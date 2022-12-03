import React from "react";
import { Box } from "native-base";
import { HomeHeader } from "@components/HomeHeader";

function HomeTemplate({ children }: { children: React.ReactNode }) {

  return (
    <Box flex="1" p={0}>
      <HomeHeader safeAreaTop pt={6} />
      <Box flex="1" p={0}>
        {children}
      </Box>
    </Box>
  );
}

export default HomeTemplate;
