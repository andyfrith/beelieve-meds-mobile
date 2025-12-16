import type { Pharmacy } from "@/data/pharmacy";
import { pharmacies } from "@/data/pharmacy";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum StorageKeys {
  PHARMACIES = "@pharmacies",
}

/**
 * Service for managing pharmacy data in AsyncStorage
 */
export const pharmacyService = {
  /**
   * Adds a new pharmacy to storage
   * @param pharmacy - The pharmacy to add
   */
  add: async (pharmacy: Pharmacy): Promise<void> => {
    try {
      const pharmacies = await pharmacyService.getAll();
      pharmacies.push(pharmacy);
      await AsyncStorage.setItem(
        StorageKeys.PHARMACIES,
        JSON.stringify(pharmacies),
      );
    } catch (error) {
      console.error("Error adding pharmacy:", error);
      throw error;
    }
  },

  /**
   * Updates an existing pharmacy in storage
   * @param pharmacy - The pharmacy with updated data
   */
  update: async (pharmacy: Pharmacy): Promise<void> => {
    try {
      const pharmacies = await pharmacyService.getAll();
      const index = pharmacies.findIndex((p) => p.id === pharmacy.id);
      if (index !== -1) {
        pharmacies[index] = pharmacy;
        await AsyncStorage.setItem(
          StorageKeys.PHARMACIES,
          JSON.stringify(pharmacies),
        );
      }
    } catch (error) {
      console.error("Error updating pharmacy:", error);
      throw error;
    }
  },

  /**
   * Deletes a pharmacy from storage by ID
   * @param id - The ID of the pharmacy to delete
   */
  delete: async (id: string): Promise<void> => {
    try {
      const pharmacies = await pharmacyService.getAll();
      const updatedPharmacies = pharmacies.filter((p) => p.id !== id);
      await AsyncStorage.setItem(
        StorageKeys.PHARMACIES,
        JSON.stringify(updatedPharmacies),
      );
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
      throw error;
    }
  },

  /**
   * Returns test/mock pharmacy data
   * @returns Promise resolving to mock pharmacies array
   */
  getAllTest: async (): Promise<Pharmacy[]> => {
    return Promise.resolve(pharmacies);
  },

  /**
   * Retrieves all pharmacies from storage
   * @returns Promise resolving to array of pharmacies
   */
  getAll: async (): Promise<Pharmacy[]> => {
    try {
      const data = await AsyncStorage.getItem(StorageKeys.PHARMACIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting pharmacies:", error);
      return [];
    }
  },

  /**
   * Retrieves a pharmacy by its ID
   * @param id - The ID of the pharmacy to retrieve
   * @returns Promise resolving to the pharmacy
   * @throws Error if pharmacy is not found
   */
  getById: async (id: string): Promise<Pharmacy> => {
    try {
      const pharmacies = await pharmacyService.getAll();
      const index = pharmacies.findIndex((p) => p.id === id);
      if (index < 0) {
        throw new Error("Pharmacy not found for id: " + id);
      }
      return pharmacies[index];
    } catch (error) {
      console.error("Error getting pharmacy by id:", error);
      throw error;
    }
  },

  /**
   * Clears all pharmacy data from storage
   */
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([StorageKeys.PHARMACIES]);
    } catch (error) {
      console.error("Error clearing pharmacy data:", error);
      throw error;
    }
  },
};

