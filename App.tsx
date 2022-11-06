import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { theme } from "@styles/theme";
import { NativeBaseProvider, StatusBar } from "native-base";

import Loading from "@components/Loading";
import SignIn from "@screens/SignIn";
import { AuthContextProvider } from "@contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {!fontsLoaded ? <Loading /> : <SignIn />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
