import { providerService } from "@/services/providerService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

/**
 * Custom hook for clearing all provider data
 * @returns Mutation object for clearing all providers
 */
export const useClearAllProviders = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: providerService.clearAll,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["providers"] });
      Alert.alert(
        "Success",
        "All provider data has been cleared successfully.",
      );
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to clear provider data. Please try again.");
    },
  });
  return mutation;
};
