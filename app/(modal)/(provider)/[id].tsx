import ProviderItemDetails from "@/components/providers/ProviderItemDetails";
import { Colors } from "@/constants/theme";
import { useDeleteProvider } from "@/hooks/providers/useDeleteProvider";
import { useProvider } from "@/hooks/providers/useProviders";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

export default function ProviderItemDetailsScreen({
  headerTitle,
}: {
  headerTitle?: string;
}) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: provider, isLoading, error } = useProvider(id);
  const { mutate: deleteProvider } = useDeleteProvider({
    successRedirectPath: "/providers",
  });
  const handleDeleteProvider = () => {
    Alert.alert(
      "Delete Provider",
      "Are you sure you want to delete provider data? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete Provider",
          style: "destructive",
          onPress: async () => {
            router.back();
            deleteProvider(id);
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={Colors.provider} />
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

  if (!provider) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="person-outline" size={48} color="#ccc" />
        <Text style={styles.emptyStateText}>No provider deails found</Text>
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
      <ProviderItemDetails
        provider={provider}
        handleDeleteProvider={handleDeleteProvider}
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
