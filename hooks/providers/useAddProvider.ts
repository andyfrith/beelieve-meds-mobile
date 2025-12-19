import { providerService } from "@/services/providerService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RelativePathString, router } from "expo-router";
import { Alert } from "react-native";

/**
 * Custom hook for adding a new provider
 * @param successRedirectPath - Optional path to redirect to after successful addition
 * @returns Mutation object for adding a provider
 */
export const useAddProvider = ({
  successRedirectPath,
}: {
  successRedirectPath?: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: providerService.add,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["providers"] });
      Alert.alert("Success", "Provider added successfully");
      if (successRedirectPath) {
        router.navigate(successRedirectPath as RelativePathString);
      }
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to save provider. Please try again.");
    },
  });
  return mutation;
};
