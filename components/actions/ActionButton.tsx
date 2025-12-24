import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function ActionButton({
  label,
  icon,
  color,
  handlePress,
}: {
  label: string;
  icon: string;
  color: string;
  handlePress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={handlePress}>
      <LinearGradient colors={["white", "white"]} style={styles.actionGradient}>
        <View style={styles.actionContent}>
          <View style={[styles.actionIcon, { backgroundColor: `${color}15` }]}>
            <Ionicons
              name={icon as keyof typeof Ionicons.glyphMap}
              size={24}
              color={color}
            />
          </View>
          <Text style={styles.actionLabel}>{label}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    width: (Dimensions.get("window").width - 52) / 2,
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
  },
  actionGradient: {
    flex: 1,
    padding: 15,
  },
  actionContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    // fontFamily: Fonts.brand,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
    paddingLeft: 10,
  },
});
