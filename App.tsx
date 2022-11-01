import { theme } from './src/styles/theme';

import { StatusBar } from "expo-status-bar";

import { NativeBaseProvider, Center, Text } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Center flex={1} bgColor="gray.900">
        <Text color="yellow.500" fontSize={24} >Tuddu Seller Center</Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}
