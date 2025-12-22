import ProviderBadge from "@/components/providers/ProviderBadge";
import { Colors } from "@/constants/theme";
import { Provider } from "@/data/provider";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

/**
 * Component for rendering a list of providers
 */
const ProviderList = ({ providers }: { providers: Provider[] }) => {
  return (
    <FlashList
      data={providers}
      renderItem={({ item: provider }) => (
        <Link href={`/(modal)/(provider)/${provider.id}`} style={styles.link}>
          <View key={provider.id} style={styles.providerCard}>
            <ProviderBadge />
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
        </Link>
      )}
      estimatedItemSize={100}
    />
  );
};

const styles = StyleSheet.create({
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
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
  metadata: {
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
    backgroundColor: `${Colors.honey.color4}15`,
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

export default ProviderList;
