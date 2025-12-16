import { Address } from "@/data/address";

export interface Pharmacy {
  id: string;
  name: string;
  address: Address;
  phone: string;
  email?: string;
  website?: string;
  hours?: string;
}

export const pharmacies: Pharmacy[] = [
  {
    id: "1",
    name: "Pharmacy 1",
    address: {
      id: "1",
      line1: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA",
    },
    phone: "123-456-7890",
  },
];
