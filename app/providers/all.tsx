import { Header } from "@/components/Header";
import { Providers } from "@/components/providers/Providers";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AllProvidersScreen() {
  return (
    <LinearGradient
      colors={[Colors.honey.color2, Colors.honey.color1]}
      style={styles.gradient}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.content}>
          <Providers headerTitle="All Providers" />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/providers/add")}
          >
            <Ionicons name="add-circle" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Provider</Text>
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
});
