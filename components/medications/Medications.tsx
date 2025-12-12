import { Colors } from "@/constants/theme";
import { useMedications } from "@/hooks/medications/useMedications";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MedicationList from "./MedicationList";

export function Medications() {
  const { data: medications, isLoading, error } = useMedications();

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} color={"white"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text style={{ color: Colors.dark.text, marginBottom: 8 }}>
          Failed to load medications
        </Text>
        <Text style={{ color: Colors.muted }}>
          {error instanceof Error ? error.message : "Please try again later"}
        </Text>
      </View>
    );
  }

  if (!medications || medications.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="medical-outline" size={48} color="#ccc" />
        <Text style={styles.emptyStateText}>
          No medications scheduled for today
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today&apos;s Meds</Text>
      </View>
      <MedicationList medications={medications} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    // fontFamily: Fonts.brand,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  seeAllButton: {
    color: Colors.honey.color4,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 16,
    marginTop: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
  },
  addMedicationButton: {
    backgroundColor: "#ffbf00",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addMedicationButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  medicationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  medicationBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  doseInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  dosageInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  doseTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    marginLeft: 5,
    color: "#666",
    fontSize: 14,
  },
});
