import { medicationService } from "@/services/medicationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useClearAllMedications = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: medicationService.clearAll,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["medications"] });
      Alert.alert(
        "Success",
        "All medication data has been cleared successfully.",
      );
    },
    onError: (error) => {
      Alert.alert(
        "Error",
        "Failed to clear medication data. Please try again.",
      );
    },
  });
  return mutation;
};
