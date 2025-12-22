import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function PharmacyBadge({
  handlePress,
}: {
  handlePress?: () => void;
}) {
  return (
    <View style={styles.badge}>
      <TouchableOpacity onPress={handlePress} disabled={!handlePress}>
        <Ionicons
          name="medkit"
          color={Colors.pharmacy}
          style={styles.badgeIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: `${Colors.pharmacy}15`,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  badgeIcon: {
    fontSize: 24,
  },
});
