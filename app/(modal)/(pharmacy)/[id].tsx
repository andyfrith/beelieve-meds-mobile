import PharmacyItemDetails from "@/components/pharmacies/PharmacyItemDetails";
import { Colors } from "@/constants/theme";
import { useDeletePharmacy } from "@/hooks/pharmacies/useDeletePharmacy";
import { usePharmacy } from "@/hooks/pharmacies/usePharmacies";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

export default function PharmacyItemDetailsScreen({
  headerTitle,
}: {
  headerTitle?: string;
}) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: pharmacy, isLoading, error } = usePharmacy(id);
  const { mutate: deletePharmacy } = useDeletePharmacy({
    successRedirectPath: "/pharmacies",
  });
  const handleDeletePharmacy = () => {
    Alert.alert(
      "Delete Pharmacy",
      "Are you sure you want to delete all pharmacy data? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete Pharmacy",
          style: "destructive",
          onPress: async () => {
            router.back();
            deletePharmacy(id);
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={Colors.pharmacy} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!pharmacy) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="storefront-outline" size={48} color="#ccc" />
        <Text style={styles.emptyStateText}>No pharmacy deails found</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      {headerTitle && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{headerTitle}</Text>
        </View>
      )}
      <PharmacyItemDetails
        pharmacy={pharmacy}
        handleDeletePharmacy={handleDeletePharmacy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    // fontFamily: Fonts.brand,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
    backgroundColor: "white",
    borderRadius: 16,
    marginTop: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
  },
  errorState: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 16,
    marginTop: 10,
  },
  errorStateText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
});
