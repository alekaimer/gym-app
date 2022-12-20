import { useCallback, useState } from "react";
import { Heading, VStack, SectionList, Text, useToast } from "native-base";
import { WithHeaderTemplate } from "@templates/WithHeaderTemplate";
import { HistoryCard } from "@components/HistoryCard";
import { AppError } from "@utils/AppError";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import Loading from "@components/Loading";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

export function History() {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const { data } = await api.get("/history");
      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico de exercícios";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <WithHeaderTemplate title="Histórico de Exercícios">
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8} py={0}>
          <SectionList
            sections={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HistoryCard data={item} />}
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
      )}
    </WithHeaderTemplate>
  );
}
