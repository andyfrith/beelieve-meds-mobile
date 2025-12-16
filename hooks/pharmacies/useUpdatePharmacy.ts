import { pharmacyService } from "@/services/pharmacyService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RelativePathString, router } from "expo-router";
import { Alert } from "react-native";

/**
 * Custom hook for updating an existing pharmacy
 * @param successRedirectPath - Optional path to redirect to after successful update
 * @returns Mutation object for updating a pharmacy
 */
export const useUpdatePharmacy = ({
  successRedirectPath,
}: {
  successRedirectPath?: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: pharmacyService.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      Alert.alert("Success", "Pharmacy updated successfully");
      if (successRedirectPath) {
        router.navigate(successRedirectPath as RelativePathString);
      }
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to update pharmacy. Please try again.");
    },
  });
  return mutation;
};
