import { providerService } from "@/services/providerService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RelativePathString, router } from "expo-router";
import { Alert } from "react-native";

/**
 * Custom hook for deleting an existing provider
 * @param successRedirectPath - Optional path to redirect to after successful delete
 * @returns Mutation object for deleting a provider
 */
export const useDeleteProvider = ({
  successRedirectPath,
}: {
  successRedirectPath?: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: providerService.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      Alert.alert("Success", "Provider deleted successfully");
      if (successRedirectPath) {
        router.navigate(successRedirectPath as RelativePathString);
      }
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to delete provider. Please try again.");
    },
  });
  return mutation;
};
