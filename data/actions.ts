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
    color: "#2E7D32",
    gradient: ["darkgreen", "darkolivegreen"] as [string, string],
  },
  {
    icon: "medical-outline" as const,
    label: "Medications",
    route: "/medications" as const,
    color: "#C2185B",
    gradient: [Colors.honey.color2, Colors.honey.color4] as [string, string],
  },
];
