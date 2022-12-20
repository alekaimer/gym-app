import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ExercisesDTO } from "@dtos/ExercisesDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import RepetitionSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";
import { StackTemplate } from "@templates/StackTemplate";
import { Button } from "@components/Button";
import Loading from "@components/Loading";

interface ExerciseProps {
  exerciseId: string;
}

export function Exercise() {
  const toast = useToast();
  const route = useRoute();
  const { exerciseId } = route.params as ExerciseProps;
  const { navigate } = useNavigation();

  const [exerciseDetails, setExerciseDetails] = useState<ExercisesDTO>(
    {} as ExercisesDTO
  );
  const [isLoading, setIsLoading] = useState(true);
  const [sendingHistoryRegister, setSendingHistoryRegister] = useState(false);

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api("/exercises/" + exerciseId);
      setExerciseDetails(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingHistoryRegister(true);
      await api.post("/history", { exercise_id: exerciseId });
      toast.show({
        title: "Parabéns! Exercício registrado no seu histórico.",
        placement: "top",
        bgColor: "green.700",
      });
      navigate("History");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSendingHistoryRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <StackTemplate title={exerciseDetails.name} group={exerciseDetails.group}>
      <ScrollView>
        {isLoading ? (
          <Loading />
        ) : (
          <VStack p={8}>
            <Box rounded={8} overflow="hidden">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetails.demo}`,
                }}
                alt="Alternate Text"
                w="full"
                h={80}
                resizeMode="cover"
                rounded={8}
              />
            </Box>

            <VStack bgColor="gray.600" mt={4} p={4} rounded={8}>
              <HStack mb={5} justifyContent="space-around">
                <HStack justifyContent="center" alignItems="center">
                  <SeriesSvg />

                  <Text color="gray.200" fontSize="sm" ml="2">
                    {exerciseDetails.series} séries
                  </Text>
                </HStack>

                <HStack justifyContent="center" alignItems="center">
                  <RepetitionSvg />

                  <Text color="gray.200" fontSize="sm" ml="2">
                    {exerciseDetails.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                title="Marcar como realizado"
                onPress={handleExerciseHistoryRegister}
                isLoading={sendingHistoryRegister}
              />
            </VStack>
          </VStack>
        )}
      </ScrollView>
    </StackTemplate>
  );
}
