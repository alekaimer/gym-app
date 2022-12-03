import React from "react";
import { Box } from "native-base";
import { Header } from "@components/Header";

type WithHeaderTemplateProps = {
  children: React.ReactNode;
  title?: string;
};

export function WithHeaderTemplate({
  children,
  title,
}: WithHeaderTemplateProps) {
  return (
    <Box flex="1" p={0}>
      <Header title={title} safeAreaTop />
      <Box flex="1" p={0}>
        {children}
      </Box>
    </Box>
  );
}
