import PharmacyBadge from "@/components/pharmacies/PharmacyBadge";
import { Colors } from "@/constants/theme";
import { Pharmacy } from "@/data/pharmacy";
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
export default function PharmacyItemDetails({
  pharmacy,
  handleDeletePharmacy,
}: {
  pharmacy: Pharmacy;
  handleDeletePharmacy: () => void;
}) {
  const router = useRouter();
  const allowDelete = false;
  const handleOpenMap = () => {
    showLocation({
      address:
        pharmacy.address.line1 +
        ", " +
        (pharmacy.address.line2 ? pharmacy.address.line2 + ", " : "") +
        pharmacy.address.city +
        ", " +
        pharmacy.address.state +
        " " +
        pharmacy.address.zip,
    });
  };
  return (
    <View style={styles.content}>
      <View key={pharmacy.id} style={styles.pharmacyCard}>
        <PharmacyBadge handlePress={() => router.back()} />
        <View style={styles.pharmacyInfo}>
          <View>
            <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
            <TouchableOpacity onPress={handleOpenMap}>
              <Text style={styles.addressText}>
                {pharmacy.address.line1}, {pharmacy.address.city},{" "}
                {pharmacy.address.state} {pharmacy.address.zip}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactInfo}>
            <Ionicons name="call-outline" size={16} color="#666" />
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${pharmacy.phone}`)}
            >
              <Text style={styles.phoneText}>{pharmacy.phone}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <ActionLink
          label="Update Pharmacy"
          icon="create-outline"
          color={Colors.pharmacy}
          route={`/pharmacies/add?id=${pharmacy.id}`}
        />
        {allowDelete && (
          <ActionButton
            label="Delete Pharmacy"
            icon="remove-circle-outline"
            color={Colors.pharmacy}
            handlePress={handleDeletePharmacy}
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
  pharmacyCard: {
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
  pharmacyBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  pharmacyInfo: {
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
