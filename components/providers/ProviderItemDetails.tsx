import { Colors } from "@/constants/theme";
import { Provider } from "@/data/provider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProviderItemDetails({
  provider,
}: {
  provider: Provider;
}) {
  const router = useRouter();
  const handleEditMedication = () => {
    router.replace({
      pathname: "/providers/add",
      params: { id: provider.id },
    });
  };
  return (
    <View style={styles.content}>
      <View key={provider.id} style={styles.providerCard}>
        <View
          style={[styles.providerBadge, { backgroundColor: `${"#000"}15` }]}
        >
          <TouchableOpacity onPress={handleEditMedication}>
            <Ionicons name="storefront" size={24} color={Colors.honey.color4} />
          </TouchableOpacity>
        </View>
        <View style={styles.providerInfo}>
          <View>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.addressText}>
              {provider.address.line1}, {provider.address.city},{" "}
              {provider.address.state} {provider.address.zip}
            </Text>
          </View>
          <View style={styles.contactInfo}>
            <Ionicons name="call-outline" size={16} color="#666" />
            <Text style={styles.phoneText}>{provider.phone}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#000",
    overflow: "hidden",
    boxShadow: "0px 4px 2px -2px rgba(0,0,0, 0.2)",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.muted,
  },
  metadata: {
    // borderTopColor: Colors.light,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 10,
  },
  metadataText: {
    fontSize: 13,
    color: Colors.muted,
  },
  dot: {
    color: "#999",
    fontSize: 13,
  },
  providerCard: {
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
  providerBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  providerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  providerInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneText: {
    marginLeft: 5,
    color: "#666",
    fontSize: 14,
  },
});
