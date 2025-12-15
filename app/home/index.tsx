import { Header } from "@/components/Header";
import { Actions } from "@/components/actions/Actions";
import { Medications } from "@/components/medications/Medications";
import { Colors } from "@/constants/theme";
import { useClearAllMedications } from "@/hooks/medications/useClearAllMedications";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { mutate: clearAllMedications } = useClearAllMedications();
  const handleClearAllData = () => {
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
          <Actions />
          <Medications
            headerTitle="Today's Meds"
            emptyMessageText="No medications scheduled for today"
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleClearAllData()}
          >
            <Text style={styles.cancelButtonText}>Clear</Text>
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
  cancelButton: {
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#fff",
    marginTop: 20,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "700",
  },
});
