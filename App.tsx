import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { theme } from "./src/styles/theme";
import { NativeBaseProvider, StatusBar } from "native-base";

// import { StatusBar } from "expo-status-bar";

import Loading from "./src/components/Loading";
import SignIn from "./src/screens/SignIn";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {!fontsLoaded ? <Loading /> : <SignIn />}
    </NativeBaseProvider>
  );
}
