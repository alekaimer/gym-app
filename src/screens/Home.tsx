import { useCallback, useEffect, useState } from "react";
import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import HomeTemplate from "@templates/HomeTemplate";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";
import { ExercisesDTO } from "@dtos/ExercisesDTO";
import Loading from "@components/Loading";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExercisesDTO[]>([]);
  const [activeGroup, setActiveGroup] = useState("costas");

  const { navigate } = useNavigation();
  const toast = useToast();

  function handleOpenExerciseDetails() {
    navigate("Exercise");
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const { data } = await api.get("/groups");
      setGroups(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/exercises/bygroup/${activeGroup}`);
      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [activeGroup])
  );

  return (
    <HomeTemplate>
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={activeGroup.toLowerCase() === item.toLowerCase()}
            onPress={() => {
              setActiveGroup(item);
              fetchExercisesByGroup();
            }}
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

      {isLoading ? (
        <Loading />
      ) : (
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ExerciseCard data={item} onPress={handleOpenExerciseDetails} />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              pb: 20,
            }}
          />
        </VStack>
      )}
    </HomeTemplate>
  );
}

export default Home;
