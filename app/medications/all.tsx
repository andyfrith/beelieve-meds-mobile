import { Header } from "@/components/Header";
import { Medications } from "@/components/medications/Medications";
import { Colors } from "@/constants/theme";
import { useClearAllMedications } from "@/hooks/medications/useClearAllMedications";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AllMedicationsScreen() {
  const { mutate: clearAllMedications } = useClearAllMedications();
  const handleClearAllMedications = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to clear all medication data? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            clearAllMedications();
          },
        },
      ],
    );
  };
  return (
    <LinearGradient
      colors={[Colors.honey.color2, Colors.honey.color1]}
      style={styles.gradient}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.content}>
          <Medications headerTitle="All Medications" />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/medications/add")}
          >
            <Ionicons name="add-circle" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Medication</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => handleClearAllMedications()}
          >
            <Ionicons name="remove-circle-outline" size={24} color="white" />
            <Text style={styles.clearButtonText}>Clear All Medications</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    marginTop: 20,
    gap: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    marginTop: 20,
    gap: 8,
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
