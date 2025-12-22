import { Colors } from "@/constants/theme";

export interface Action {
  icon: string;
  label: string;
  route: string;
  color: string;
  gradient: string[];
}

export const actions: Action[] = [
  {
    icon: "add-circle-outline" as const,
    label: "Add Medication",
    route: "/medications/add" as const,
    color: Colors.medication,
    gradient: ["darkgreen", "darkolivegreen"] as [string, string],
  },
  {
    icon: "medical-outline" as const,
    label: "Medications",
    route: "/medications/all" as const,
    color: Colors.medication,
    gradient: [Colors.honey.color2, Colors.honey.color4] as [string, string],
  },
  {
    icon: "add-circle-outline" as const,
    label: "Add Pharmacy",
    route: "/pharmacies/add" as const,
    color: Colors.pharmacy,
    gradient: ["darkgreen", "darkolivegreen"] as [string, string],
  },
  {
    icon: "medkit-outline" as const,
    label: "Pharmacies",
    route: "/pharmacies/all" as const,
    color: Colors.pharmacy,
    gradient: [Colors.honey.color2, Colors.honey.color4] as [string, string],
  },
  {
    icon: "add-circle-outline" as const,
    label: "Add Provider",
    route: "/providers/add" as const,
    color: Colors.provider,
    gradient: ["darkgreen", "darkolivegreen"] as [string, string],
  },
  {
    icon: "people-outline" as const,
    label: "Providers",
    route: "/providers/all" as const,
    color: Colors.provider,
    gradient: [Colors.honey.color2, Colors.honey.color4] as [string, string],
  },
];
