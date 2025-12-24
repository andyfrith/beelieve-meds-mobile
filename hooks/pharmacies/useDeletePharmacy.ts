import { pharmacyService } from "@/services/pharmacyService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RelativePathString, router } from "expo-router";
import { Alert } from "react-native";

/**
 * Custom hook for deleting an existing pharmacy
 * @param successRedirectPath - Optional path to redirect to after successful delete
 * @returns Mutation object for deleting a pharmacy
 */
export const useDeletePharmacy = ({
  successRedirectPath,
}: {
  successRedirectPath?: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: pharmacyService.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      Alert.alert("Success", "Pharmacy deleted successfully");
      if (successRedirectPath) {
        router.navigate(successRedirectPath as RelativePathString);
      }
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to delete pharmacy. Please try again.");
    },
  });
  return mutation;
};
