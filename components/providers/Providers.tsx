import { Colors } from "@/constants/theme";
import { useProviders } from "@/hooks/providers/useProviders";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ProviderList from "./ProviderList";

/**
 * Component for displaying a list of providers with loading and error states
 */
export function Providers({
  headerTitle,
  emptyMessageText = "No providers found",
}: {
  headerTitle?: string;
  emptyMessageText?: string;
}) {
  const { data: providers, isLoading, error } = useProviders();

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} color={"white"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorState}>
        <Text style={styles.errorStateText}>Failed to load providers</Text>
        <Text style={{ color: Colors.muted }}>
          {error instanceof Error ? error.message : "Please try again later"}
        </Text>
      </View>
    );
  }

  if (!providers || providers.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="person-outline" size={48} color="#ccc" />
        <Text style={styles.emptyStateText}>{emptyMessageText}</Text>
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
      <ProviderList providers={providers} />
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
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  seeAllButton: {
    color: Colors.honey.color4,
    fontWeight: "600",
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
