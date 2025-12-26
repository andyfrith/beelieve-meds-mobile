import ProviderBadge from "@/components/providers/ProviderBadge";
import { Colors } from "@/constants/theme";
import { Provider } from "@/data/provider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { showLocation } from "react-native-map-link";
import { ActionButton } from "../actions/ActionButton";
import { ActionLink } from "../actions/ActionLink";

export default function ProviderItemDetails({
  provider,
  handleDeleteProvider,
}: {
  provider: Provider;
  handleDeleteProvider: () => void;
}) {
  const router = useRouter();
  const handleEditProvider = () => {
    router.replace({
      pathname: "/providers/add",
      params: { id: provider.id },
    });
  };
  const handleOpenMap = () => {
    showLocation({
      address:
        provider.address.line1 +
        ", " +
        (provider.address.line2 ? provider.address.line2 + ", " : "") +
        provider.address.city +
        ", " +
        provider.address.state +
        " " +
        provider.address.zip,
    });
  };
  const allowDelete = false;
  return (
    <View style={styles.content}>
      <View key={provider.id} style={styles.providerCard}>
        <ProviderBadge handlePress={handleEditProvider} />
        <View style={styles.providerInfo}>
          <View>
            <Text style={styles.providerName}>{provider.name}</Text>
            <TouchableOpacity onPress={handleOpenMap}>
              <Text style={styles.addressText}>
                {provider.address.line1}, {provider.address.city},{" "}
                {provider.address.state} {provider.address.zip}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactInfo}>
            <Ionicons name="call-outline" size={16} color="#666" />
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${provider.phone}`)}
            >
              <Text style={styles.phoneText}>{provider.phone}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <ActionLink
          label="Update Provider"
          icon="create-outline"
          color={Colors.provider}
          route={`/providers/add?id=${provider.id}`}
        />
        {allowDelete && (
          <ActionButton
            label="Delete Provider"
            icon="remove-circle-outline"
            color={Colors.provider}
            handlePress={handleDeleteProvider}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
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
  actions: {
    flexDirection: "row",
    gap: 10,
  },
});
