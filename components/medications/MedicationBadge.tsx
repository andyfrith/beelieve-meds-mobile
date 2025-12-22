import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function MedicationBadge({
  handlePress,
}: {
  handlePress?: () => void;
}) {
  return (
    <View style={styles.medicationBadge}>
      <TouchableOpacity onPress={handlePress} disabled={!handlePress}>
        <Ionicons
          name="medical"
          color={Colors.medication}
          style={styles.medicationBadgeIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  medicationBadge: {
    backgroundColor: `${Colors.medication}15`,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  medicationBadgeIcon: {
    fontSize: 24,
  },
});
