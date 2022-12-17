import { useEffect, useState } from "react";
import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import HomeTemplate from "@templates/HomeTemplate";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";

function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [activeGroup, setActiveGroup] = useState("costas");

  const { navigate } = useNavigation();
  const toast = useToast();

  function handleOpenExerciseDetails() {
    navigate("Exercise");
  }

  async function fetchGroups() {
    try {
      const { data } = await api.get("/groups");
      setGroups(data);
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível carregar os grupos";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <HomeTemplate>
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
        minH={10}
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
          renderItem={({ item }) => <ExerciseCard onPress={handleOpenExerciseDetails} />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            pb: 20,
          }}
        />
      </VStack>
    </HomeTemplate>
  );
}

export default Home;
