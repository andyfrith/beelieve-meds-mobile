import { Address } from "@/data/address";

export interface Provider {
  id: string;
  name: string;
  address: Address;
  phone: string;
  email?: string;
  website?: string;
  hours?: string;
}

export const providers: Provider[] = [
  {
    id: "1",
    name: "Provider 1",
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
