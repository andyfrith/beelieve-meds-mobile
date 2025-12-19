import { providerService } from "@/services/providerService";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook for fetching all providers
 * @returns Query object with providers data
 */
export const useProviders = () => {
  return useQuery({
    queryKey: ["providers"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return providerService.getAll();
    },
  });
};

/**
 * Custom hook for fetching a single provider by ID
 * @param id - The ID of the provider to fetch
 * @returns Query object with provider data
 */
export const useProvider = (id: string) => {
  return useQuery({
    queryKey: ["provider", id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return providerService.getById(id);
    },
    enabled: !!id,
  });
};
