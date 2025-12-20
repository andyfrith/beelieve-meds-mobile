import { Colors } from "@/constants/theme";
import { Pharmacy } from "@/data/pharmacy";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

/**
 * Component for rendering a list of pharmacies
 */
const PharmacyList = ({ pharmacies }: { pharmacies: Pharmacy[] }) => {
  return (
    <FlashList
      data={pharmacies}
      renderItem={({ item: pharmacy }) => (
        <Link href={`/(modal)/(pharmacy)/${pharmacy.id}`} style={styles.link}>
          <View key={pharmacy.id} style={styles.pharmacyCard}>
            <View style={styles.pharmacyBadge}>
              <Ionicons name="storefront" size={24} color={Colors.pharmacy} />
            </View>
            <View style={styles.pharmacyInfo}>
              <View>
                <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                <Text style={styles.addressText}>
                  {pharmacy.address.line1}, {pharmacy.address.city},{" "}
                  {pharmacy.address.state} {pharmacy.address.zip}
                </Text>
              </View>
              <View style={styles.contactInfo}>
                <Ionicons name="call-outline" size={16} color="#666" />
                <Text style={styles.phoneText}>{pharmacy.phone}</Text>
              </View>
            </View>
          </View>
        </Link>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: `${Colors.honey.color4}15`,
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
});

export default PharmacyList;
