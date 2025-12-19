import type { Provider } from "@/data/provider";
import { providers } from "@/data/provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum StorageKeys {
  PROVIDERS = "@providers",
}

/**
 * Service for managing provider data in AsyncStorage
 */
export const providerService = {
  /**
   * Adds a new provider to storage
   * @param provider - The provider to add
   */
  add: async (provider: Provider): Promise<void> => {
    try {
      const providers = await providerService.getAll();
      providers.push(provider);
      await AsyncStorage.setItem(
        StorageKeys.PROVIDERS,
        JSON.stringify(providers),
      );
    } catch (error) {
      console.error("Error adding provider:", error);
      throw error;
    }
  },

  /**
   * Updates an existing provider in storage
   * @param provider - The provider with updated data
   */
  update: async (provider: Provider): Promise<void> => {
    try {
      const providers = await providerService.getAll();
      const index = providers.findIndex((p) => p.id === provider.id);
      if (index !== -1) {
        providers[index] = provider;
        await AsyncStorage.setItem(
          StorageKeys.PROVIDERS,
          JSON.stringify(providers),
        );
      }
    } catch (error) {
      console.error("Error updating provider:", error);
      throw error;
    }
  },

  /**
   * Deletes a provider from storage by ID
   * @param id - The ID of the provider to delete
   */
  delete: async (id: string): Promise<void> => {
    try {
      const providers = await providerService.getAll();
      const updatedProviders = providers.filter((p) => p.id !== id);
      await AsyncStorage.setItem(
        StorageKeys.PROVIDERS,
        JSON.stringify(updatedProviders),
      );
    } catch (error) {
      console.error("Error deleting provider:", error);
      throw error;
    }
  },

  /**
   * Returns test/mock provider data
   * @returns Promise resolving to mock providers array
   */
  getAllTest: async (): Promise<Provider[]> => {
    return Promise.resolve(providers);
  },

  /**
   * Retrieves all providers from storage
   * @returns Promise resolving to array of providers
   */
  getAll: async (): Promise<Provider[]> => {
    try {
      const data = await AsyncStorage.getItem(StorageKeys.PROVIDERS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting providers:", error);
      return [];
    }
  },

  /**
   * Retrieves a provider by its ID
   * @param id - The ID of the provider to retrieve
   * @returns Promise resolving to the provider
   * @throws Error if provider is not found
   */
  getById: async (id: string): Promise<Provider> => {
    try {
      const providers = await providerService.getAll();
      const index = providers.findIndex((p) => p.id === id);
      if (index < 0) {
        throw new Error("Provider not found for id: " + id);
      }
      return providers[index];
    } catch (error) {
      console.error("Error getting provider by id:", error);
      throw error;
    }
  },

  /**
   * Clears all provider data from storage
   */
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([StorageKeys.PROVIDERS]);
    } catch (error) {
      console.error("Error clearing provider data:", error);
      throw error;
    }
  },
};
