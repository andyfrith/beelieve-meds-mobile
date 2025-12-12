export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  times: string[];
  startDate: Date;
  color?: string;
  reminderEnabled?: boolean;
  currentSupply?: number | string;
  totalSupply?: number;
  refillAt?: number | string;
  refillReminder?: boolean;
  notes?: string;
  lastRefillDate?: string;
}

export const medications: Medication[] = [
  {
    id: "1",
    color: "#4CAF50",
    name: "Medication 1",
    dosage: "10mg",
    frequency: "daily",
    duration: "10 days",
    times: ["9:00"],
    startDate: new Date(),
  },
  {
    id: "2",
    color: "#2196F3",
    name: "Medication 2",
    dosage: "20mg",
    frequency: "daily",
    duration: "10 days",
    times: ["10:00"],
    startDate: new Date(),
  },
];
