import React from "react";
import { Box } from "native-base";
import { HomeHeader } from "@components/HomeHeader";

function WithHeaderTemplate({ children }: { children: React.ReactNode }) {

  return (
    <Box flex="1" p={0}>
      <HomeHeader safeAreaTop />
      <Box flex="1" p={0}>
        {children}
      </Box>
    </Box>
  );
}

export default WithHeaderTemplate;
