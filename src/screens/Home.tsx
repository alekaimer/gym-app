import React from "react";
import { FlatList, Heading, HStack, Text, VStack } from "native-base";
import WithHeaderTemplate from "@templates/WithHeaderTemplate";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";

function Home() {
  const [groups, setGroups] = React.useState([
    "Costas",
    "Bíceps",
    "Tríceps",
    "Ombro",
  ]);
  const [exercises, setExercises] = React.useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [activeGroup, setActiveGroup] = React.useState("costas");

  return (
    <WithHeaderTemplate>
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={activeGroup.toLowerCase() === item.toLowerCase()}
            onPress={() => setActiveGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
      />

      <VStack flex={1} px={`8`}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            pb: 20,
          }}
        />
      </VStack>
    </WithHeaderTemplate>
  );
}

export default Home;
