import { pharmacyService } from "@/services/pharmacyService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

/**
 * Custom hook for clearing all pharmacy data
 * @returns Mutation object for clearing all pharmacies
 */
export const useClearAllPharmacies = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: pharmacyService.clearAll,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["pharmacies"] });
      Alert.alert(
        "Success",
        "All pharmacy data has been cleared successfully.",
      );
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to clear pharmacy data. Please try again.");
    },
  });
  return mutation;
};
