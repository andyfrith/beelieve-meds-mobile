import { Header } from "@/components/Header";
import MedicationForm from "@/components/medications/MedicationForm";
import { Colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, View } from "react-native";

export default function AddMedicationScreen() {
  // const { id } = useLocalSearchParams<{ id: string }>();
  // if (id) {
  //   console.log("id", id);
  // }
  // const { data: medication, isLoading, error } = useMedication(id);

  return (
    <LinearGradient
      colors={[Colors.honey.color2, Colors.honey.color1]}
      style={styles.gradient}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.content}>
          <MedicationForm />
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
});
