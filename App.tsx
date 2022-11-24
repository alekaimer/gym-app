import React from "react";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { theme } from "@styles/theme";
import { NativeBaseProvider } from "native-base";

import Loading from "@components/Loading";
import { AuthContextProvider } from "@contexts/AuthContext";
import { MainRoutes } from "@routes/index";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <AuthContextProvider>
        {!fontsLoaded ? <Loading /> : <MainRoutes />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
