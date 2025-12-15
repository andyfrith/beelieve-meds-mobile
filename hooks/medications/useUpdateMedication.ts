import { medicationService } from "@/services/medicationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RelativePathString, router } from "expo-router";
import { Alert } from "react-native";

export const useUpdateMedication = ({
  successRedirectPath,
}: {
  successRedirectPath?: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: medicationService.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      Alert.alert("Success", "Medication updated successfully");
      if (successRedirectPath) {
        router.navigate(successRedirectPath as RelativePathString);
      }
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to update medication. Please try again.");
    },
  });
  return mutation;
};
