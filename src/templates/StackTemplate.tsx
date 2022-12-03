import React from "react";
import { Box, Button, Center, Flex, Heading, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

interface StackTemplateProps {
  title: string;
  children: React.ReactNode;
  goBackButtonShow?: boolean;
}

export function StackTemplate({ title, children }: StackTemplateProps) {
  const { goBack } = useNavigation();

  return (
    <Box flex="1" bgColor="gray.600">
      <Box bgColor="gray.200" safeAreaTop>
        <Flex
          direction="row"
          py={1}
          borderBottomColor="gray.100"
          borderBottomWidth={2}
          _text={{
            color: "coolGray.800",
          }}
        >
          <Button
            variant="link"
            p={2}
            pl={6}
            _text={{
              color: "white",
            }}
            onPress={() => {
              goBack();
            }}
          >
            <Icon
              as={MaterialIcons}
              name="arrow-back-ios"
              color="white"
              size="xl"
            />
          </Button>
          <Center>
            <Heading color="white">{title}</Heading>
          </Center>
        </Flex>
      </Box>
      <Box flex="1">{children}</Box>
    </Box>
  );
}
