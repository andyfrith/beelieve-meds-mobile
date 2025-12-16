import { Pharmacy } from "@/data/pharmacy";
import { useAddPharmacy } from "@/hooks/pharmacies/useAddPharmacy";
import { useUpdatePharmacy } from "@/hooks/pharmacies/useUpdatePharmacy";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

/**
 * Form component for adding or editing a pharmacy
 */
export default function PharmacyForm({ pharmacy }: { pharmacy?: Pharmacy }) {
  const { mutate: addPharmacy } = useAddPharmacy({
    successRedirectPath: "/pharmacies",
  });
  const { mutate: updatePharmacy } = useUpdatePharmacy({
    successRedirectPath: "/pharmacies",
  });

  const addressSchema = z.object({
    id: z.string(),
    line1: z.string().min(1, { message: "Address line 1 is required." }),
    line2: z.string().optional(),
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().min(1, { message: "State is required." }),
    zip: z.string().min(1, { message: "ZIP code is required." }),
    country: z.string().min(1, { message: "Country is required." }),
  });

  const pharmacySchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Pharmacy name is required." }),
    address: addressSchema,
    phone: z.string().min(1, { message: "Phone number is required." }),
    email: z.string().email().optional().or(z.literal("")),
    website: z.string().url().optional().or(z.literal("")),
    hours: z.string().optional(),
  });

  type FormValues = z.infer<typeof pharmacySchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(pharmacySchema),
    defaultValues: pharmacy
      ? {
          id: pharmacy.id,
          name: pharmacy.name,
          address: {
            id: pharmacy.address.id,
            line1: pharmacy.address.line1,
            line2: pharmacy.address.line2 || "",
            city: pharmacy.address.city,
            state: pharmacy.address.state,
            zip: pharmacy.address.zip,
            country: pharmacy.address.country,
          },
          phone: pharmacy.phone,
          email: pharmacy.email || "",
          website: pharmacy.website || "",
          hours: pharmacy.hours || "",
        }
      : {
          id: Math.random().toString(36).substr(2, 9),
          name: "",
          address: {
            id: Math.random().toString(36).substr(2, 9),
            line1: "",
            line2: "",
            city: "",
            state: "",
            zip: "",
            country: "USA",
          },
          phone: "",
          email: "",
          website: "",
          hours: "",
        },
  });

  async function onSubmit(data: FormValues) {
    const pharmacyData: Pharmacy = {
      ...data,
      email: data.email || undefined,
      website: data.website || undefined,
      hours: data.hours || undefined,
    };

    if (pharmacy) {
      updatePharmacy(pharmacyData);
    } else {
      addPharmacy(pharmacyData);
    }
  }

  function Footer() {
    return (
      <View style={styles.footer}>
        {errors.name && (
          <Text style={styles.errorText}>
            * Please provide a pharmacy name.
          </Text>
        )}
        {errors.phone && (
          <Text style={styles.errorText}>* Please provide a phone number.</Text>
        )}
        {errors.address?.line1 && (
          <Text style={styles.errorText}>* Please provide an address.</Text>
        )}
        {errors.address?.city && (
          <Text style={styles.errorText}>* Please provide a city.</Text>
        )}
        {errors.address?.state && (
          <Text style={styles.errorText}>* Please provide a state.</Text>
        )}
        {errors.address?.zip && (
          <Text style={styles.errorText}>* Please provide a ZIP code.</Text>
        )}
        <TouchableOpacity
          style={[
            styles.saveButton,
            (isSubmitting || !isValid) && styles.saveButtonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <LinearGradient
            colors={["#ffbf00", "#ffdf00"]}
            style={styles.saveButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.saveButtonText}>
              {isSubmitting
                ? pharmacy
                  ? "Updating..."
                  : "Adding..."
                : pharmacy
                  ? "Update Pharmacy"
                  : "Add Pharmacy"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
          disabled={isSubmitting}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function BasicInformation() {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pharmacy Name</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {errors.name && (
                  <Ionicons
                    name="storefront"
                    size={24}
                    color="red"
                    style={{ marginLeft: 10 }}
                  />
                )}
                <TextInput
                  placeholder="Pharmacy Name"
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.mainInput}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  function ContactInformation() {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {errors.phone && (
                  <Ionicons
                    name="call"
                    size={24}
                    color="red"
                    style={{ marginLeft: 10 }}
                  />
                )}
                <TextInput
                  placeholder="Phone Number"
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.mainInput}
                  keyboardType="phone-pad"
                />
              </View>
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email (optional)"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.mainInput}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="website"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Website (optional)"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.mainInput}
                keyboardType="url"
                autoCapitalize="none"
              />
            )}
          />
        </View>
      </View>
    );
  }

  function AddressInformation() {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="address.line1"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {errors.address?.line1 && (
                  <Ionicons
                    name="location"
                    size={24}
                    color="red"
                    style={{ marginLeft: 10 }}
                  />
                )}
                <TextInput
                  placeholder="Street Address"
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.mainInput}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="address.line2"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Apt, Suite, Unit (optional)"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.mainInput}
              />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="address.city"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {errors.address?.city && (
                  <Ionicons
                    name="location"
                    size={24}
                    color="red"
                    style={{ marginLeft: 10 }}
                  />
                )}
                <TextInput
                  placeholder="City"
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.mainInput}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.rowInputs}>
          <View style={[styles.inputContainer, styles.flex1]}>
            <Controller
              control={control}
              name="address.state"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {errors.address?.state && (
                    <Ionicons
                      name="location"
                      size={24}
                      color="red"
                      style={{ marginLeft: 10 }}
                    />
                  )}
                  <TextInput
                    placeholder="State"
                    placeholderTextColor="#999"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.mainInput}
                  />
                </View>
              )}
            />
          </View>
          <View style={[styles.inputContainer, styles.flex1]}>
            <Controller
              control={control}
              name="address.zip"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {errors.address?.zip && (
                    <Ionicons
                      name="location"
                      size={24}
                      color="red"
                      style={{ marginLeft: 10 }}
                    />
                  )}
                  <TextInput
                    placeholder="ZIP Code"
                    placeholderTextColor="#999"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.mainInput}
                    keyboardType="numeric"
                  />
                </View>
              )}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="address.country"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Country"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.mainInput}
              />
            )}
          />
        </View>
      </View>
    );
  }

  function HoursInformation() {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hours of Operation</Text>
        <View style={styles.textAreaContainer}>
          <Controller
            control={control}
            name="hours"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="e.g., Mon-Fri: 9am-9pm, Sat-Sun: 10am-6pm"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textArea}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            )}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formContentContainer}
      >
        <BasicInformation />
        <ContactInformation />
        <AddressInformation />
        <HoursInformation />
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  formContentContainer: {
    padding: 0,
    paddingTop: 0,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 15,
    marginTop: 0,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  mainInput: {
    fontSize: 18,
    color: "#333",
    padding: 15,
    flex: 1,
  },
  rowInputs: {
    flexDirection: "row",
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  footer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonGradient: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "700",
  },
  errorText: {
    color: "#FF5252",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
    marginLeft: 12,
  },
  textAreaContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  textArea: {
    height: 80,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
});
