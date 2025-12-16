import { pharmacyService } from "@/services/pharmacyService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RelativePathString, router } from "expo-router";
import { Alert } from "react-native";

/**
 * Custom hook for adding a new pharmacy
 * @param successRedirectPath - Optional path to redirect to after successful addition
 * @returns Mutation object for adding a pharmacy
 */
export const useAddPharmacy = ({
  successRedirectPath,
}: {
  successRedirectPath?: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: pharmacyService.add,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["pharmacies"] });
      Alert.alert("Success", "Pharmacy added successfully");
      if (successRedirectPath) {
        router.navigate(successRedirectPath as RelativePathString);
      }
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to save pharmacy. Please try again.");
    },
  });
  return mutation;
};
