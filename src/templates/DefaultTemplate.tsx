import React from "react";
import { Box, IBoxProps
 } from "native-base";

interface DefaultTemplateProps extends IBoxProps {
  children: React.ReactNode;
}

export function DefaultTemplate({ children, ...props }: DefaultTemplateProps) {
  return (
    <Box flex="1" {...props}>
      {children}
    </Box>
  );
}
