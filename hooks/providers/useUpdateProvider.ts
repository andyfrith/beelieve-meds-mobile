import { providerService } from "@/services/providerService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RelativePathString, router } from "expo-router";
import { Alert } from "react-native";

/**
 * Custom hook for updating an existing provider
 * @param successRedirectPath - Optional path to redirect to after successful update
 * @returns Mutation object for updating a provider
 */
export const useUpdateProvider = ({
  successRedirectPath,
}: {
  successRedirectPath?: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: providerService.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      Alert.alert("Success", "Provider updated successfully");
      if (successRedirectPath) {
        router.navigate(successRedirectPath as RelativePathString);
      }
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to update provider. Please try again.");
    },
  });
  return mutation;
};
