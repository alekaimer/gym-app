import React from "react";
import { Box } from "native-base";
import { Header } from "@components/Header";

export function WithHeaderTemplate({ children }: { children: React.ReactNode }) {

  return (
    <Box flex="1" p={0}>
      <Header safeAreaTop />
      <Box flex="1" p={0}>
        {children}
      </Box>
    </Box>
  );
}
