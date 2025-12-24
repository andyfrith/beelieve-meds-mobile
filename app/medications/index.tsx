import { Header } from "@/components/Header";
import { Actions } from "@/components/actions/Actions";
import { Medications } from "@/components/medications/Medications";
import { Colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, View } from "react-native";

export default function MedicationsScreen() {
  return (
    <LinearGradient
      colors={[Colors.honey.color2, Colors.honey.color1]}
      style={styles.gradient}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.content}>
          <Actions module="medications" />
          <Medications
            headerTitle="Today's Meds"
            emptyMessageText="No medications scheduled for today"
          />
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
