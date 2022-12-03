import React from "react";
import { Heading, VStack, SectionList, Text } from "native-base";
import { WithHeaderTemplate } from "@templates/WithHeaderTemplate";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  const [exercises, setExercises] = React.useState([
    { title: "03.12.22", data: ["Puxada frontal", "Remada unilateral"] },
    { title: "04.12.22", data: ["Puxada frontal"] },
    { title: "03.12.22", data: ["Puxada frontal", "Remada unilateral"] },
    { title: "04.12.22", data: ["Puxada frontal"] },
    { title: "03.12.22", data: ["Puxada frontal", "Remada unilateral"] },
    { title: "04.12.22", data: ["Puxada frontal"] },
    { title: "03.12.22", data: ["Puxada frontal", "Remada unilateral"] },
    { title: "04.12.22", data: ["Puxada frontal"] },
  ]);

  return (
    <WithHeaderTemplate title="Histórico de Exercícios">
      <VStack flex={1} px={8} py={0}>
        <SectionList
          sections={exercises}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <HistoryCard />}
          renderSectionHeader={({ section: { title } }) => (
            <Heading color="gray.200" fontSize="md" mb={3} mt={10}>
              {title}
            </Heading>
          )}
          contentContainerStyle={
            exercises.length === 0 && {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }
          }
          ListEmptyComponent={
            <Text color="gray.200" fontSize="md" textAlign="center">
              Não há exercícios registrados.{"\n"}
              Vamos começar hoje?
            </Text>
          }
        />
      </VStack>
    </WithHeaderTemplate>
  );
}
