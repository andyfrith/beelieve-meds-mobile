import { ActionLink } from "@/components/actions/ActionLink";
import { useActions } from "@/hooks/useActions";
import { StyleSheet, Text, View } from "react-native";

export function Actions({
  title = "Actions",
  module,
}: {
  title?: string;
  module?: string;
}) {
  const { data: actions } = useActions(module);

  if (!actions) {
    return null;
  }

  return (
    <View style={styles.actionsContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <ActionLink
            key={action.label}
            label={action.label}
            icon={action.icon}
            color={action.color}
            route={action.route as any}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    paddingHorizontal: 0,
    marginBottom: 25,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginBottom: 5,
    // fontFamily: Fonts.brand,
  },
});
