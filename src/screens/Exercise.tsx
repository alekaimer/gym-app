import React from "react";
import {
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { DefaultTemplate } from "@templates/DefaultTemplate";
import { StackTemplate } from "@templates/StackTemplate";
import { Button } from "@components/Button";
import RepetitionSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";

export function Exercise() {
  return (
    <StackTemplate title={"Nome do exercício"}>
      <ScrollView>
        <VStack p={8}>
          <Image
            source={{
              uri: "http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
            }}
            alt="Alternate Text"
            w="full"
            h={80}
            resizeMode="cover"
            rounded={8}
          />

          <VStack bgColor="gray.600" mt={4} p={4} rounded={8}>
            <HStack mb={5} justifyContent="space-around">
              <HStack justifyContent="center" alignItems="center">
                <SeriesSvg />

                <Text color="gray.200" fontSize="sm" ml="2">
                  3 séries
                </Text>
              </HStack>

              <HStack justifyContent="center" alignItems="center">
                <RepetitionSvg />

                <Text color="gray.200" fontSize="sm" ml="2">
                  10 repetições
                </Text>
              </HStack>
            </HStack>
            <Button title="Marcar como realizado" />
          </VStack>
        </VStack>
      </ScrollView>
    </StackTemplate>
  );
}
