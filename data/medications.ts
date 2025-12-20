export interface Medication {
  id: string;
  color: string;
  currentSupply?: number | string;
  dosage: string;
  duration: Duration;
  frequency: Frequency;
  lastRefillDate?: string;
  name: string;
  notes?: string;
  pharmacyId?: string;
  providerId?: string;
  refillAt?: number | string;
  refillReminder?: boolean;
  reminderEnabled?: boolean;
  startDate: Date;
  times: string[];
  totalSupply?: number;
}
export type Duration = "7 days" | "14 days" | "30 days" | "90 days" | "Ongoing";
export type Frequency =
  | "Once daily"
  | "Twice daily"
  | "Three times daily"
  | "Four times daily"
  | "As needed";

export const medications: Medication[] = [
  {
    id: "1",
    color: "#4CAF50",
    name: "Medication 1",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "7 days",
    times: ["9:00"],
    startDate: new Date(),
  },
  {
    id: "2",
    color: "#2196F3",
    name: "Medication 2",
    dosage: "20mg",
    frequency: "Twice daily",
    duration: "14 days",
    times: ["10:00"],
    startDate: new Date(),
  },
];
