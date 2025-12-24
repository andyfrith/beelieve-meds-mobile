import { medicationService } from "@/services/medicationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RelativePathString, router } from "expo-router";
import { Alert } from "react-native";

export const useDeleteMedication = ({
  successRedirectPath,
}: {
  successRedirectPath?: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: medicationService.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      Alert.alert("Success", "Medication deleted successfully");
      if (successRedirectPath) {
        router.navigate(successRedirectPath as RelativePathString);
      }
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to delete medication. Please try again.");
    },
  });
  return mutation;
};
