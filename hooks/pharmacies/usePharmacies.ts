import { pharmacyService } from "@/services/pharmacyService";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook for fetching all pharmacies
 * @returns Query object with pharmacies data
 */
export const usePharmacies = () => {
  return useQuery({
    queryKey: ["pharmacies"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return pharmacyService.getAll();
    },
  });
};

/**
 * Custom hook for fetching a single pharmacy by ID
 * @param id - The ID of the pharmacy to fetch
 * @returns Query object with pharmacy data
 */
export const usePharmacy = (id: string) => {
  return useQuery({
    queryKey: ["pharmacy", id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return pharmacyService.getById(id);
    },
    enabled: !!id,
  });
};
