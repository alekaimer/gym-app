import { Box } from "native-base";
import React from "react";

import Logo from "@assets/logo.svg";

function Header() {
  return (
    <Box p={7} alignItems="center">
      <Logo width={212} height={40} />
    </Box>
  );
}

export default Header;
