import MedicationItemDetails from "@/components/medications/MedicationItemDetails";
import { Colors } from "@/constants/theme";
import { useDeleteMedication } from "@/hooks/medications/useDeleteMedication";
import { useMedication } from "@/hooks/medications/useMedications";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

export default function MedicationItemDetailsScreen({
  headerTitle,
}: {
  headerTitle?: string;
}) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: medication, isLoading, error } = useMedication(id);
  const { mutate: deleteMedication } = useDeleteMedication({
    successRedirectPath: "/medications",
  });
  const handleDeleteMedication = () => {
    Alert.alert(
      "Delete Medication",
      "Are you sure you want to delete medication data? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete Medication",
          style: "destructive",
          onPress: async () => {
            router.back();
            deleteMedication(id);
          },
        },
      ],
    );
  };
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={Colors.medication} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!medication) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="medical-outline" size={48} color="#ccc" />
        <Text style={styles.emptyStateText}>No medication deails found</Text>
      </View>
    );
  }
  return (
    <View style={styles.section}>
      {headerTitle && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{headerTitle}</Text>
        </View>
      )}
      <MedicationItemDetails
        medication={medication}
        handleDeleteMedication={handleDeleteMedication}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 0,
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
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
  errorState: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 16,
    marginTop: 10,
  },
  errorStateText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
});
