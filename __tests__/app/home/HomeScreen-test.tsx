import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import React from "react";

import HomeScreen from "@/app/home/index";

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  router: {
    replace: (path: string) => mockReplace(path),
  },
}));

jest.mock("@expo/vector-icons", () => {
  const { View } = jest.requireActual("react-native");
  return {
    MaterialCommunityIcons: ({
      name,
      testID,
    }: {
      name: string;
      testID?: string;
    }) => <View testID={testID || `icon-${name}`} />,
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <View testID={testID || `icon-${name}`} />
    ),
  };
});

jest.mock("@shopify/flash-list", () => {
  const { View } = jest.requireActual("react-native");
  return {
    FlashList: ({
      data,
      renderItem,
    }: {
      data: unknown[];
      renderItem: (info: { item: unknown }) => React.ReactNode;
    }) => (
      <View testID="flash-list">
        {data?.map((item, index) => (
          <View key={index}>{renderItem({ item })}</View>
        ))}
      </View>
    ),
  };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

const mockMedications = [
  {
    id: "1",
    name: "Aspirin",
    dosage: "100mg",
    frequency: "daily",
    duration: "30 days",
    times: ["9:00 AM"],
    startDate: new Date(),
    color: "#FF5733",
  },
];

let queryClient: QueryClient;

/**
 * Creates a fresh QueryClient for each test to ensure isolation.
 */
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
}

/**
 * Wrapper component that provides QueryClient context for tests.
 */
function createWrapper() {
  queryClient = createTestQueryClient();
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("<HomeScreen />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(async () => {
    // Cancel any pending queries and clear the cache
    queryClient?.cancelQueries();
    queryClient?.clear();

    // Clean up rendered components
    cleanup();

    // Clear all timers before switching back to real timers
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe("Header integration", () => {
    test("renders Header with default title", () => {
      render(<HomeScreen />, { wrapper: createWrapper() });
      const headerTitle = screen.getByText("Beelieve");
      expect(headerTitle).toBeOnTheScreen();
    });

    test("renders bee icon in Header", () => {
      render(<HomeScreen />, { wrapper: createWrapper() });
      const beeIcon = screen.getByTestId("icon-bee");
      expect(beeIcon).toBeOnTheScreen();
    });

    test("Header navigates to home when pressed", () => {
      render(<HomeScreen />, { wrapper: createWrapper() });
      const headerTitle = screen.getByText("Beelieve");
      fireEvent.press(headerTitle);
      expect(mockReplace).toHaveBeenCalledWith("/home");
    });
  });

  describe("Medications integration", () => {
    test("shows empty state when no medications exist", async () => {
      render(<HomeScreen />, { wrapper: createWrapper() });

      await act(async () => {
        jest.advanceTimersByTime(1500);
      });

      await waitFor(() => {
        expect(
          screen.getByText("No medications scheduled for today"),
        ).toBeOnTheScreen();
      });
    });

    test("displays medications when data is loaded", async () => {
      const AsyncStorage = require("@react-native-async-storage/async-storage");
      AsyncStorage.getItem.mockResolvedValueOnce(
        JSON.stringify(mockMedications),
      );

      render(<HomeScreen />, { wrapper: createWrapper() });

      await act(async () => {
        jest.advanceTimersByTime(1500);
      });

      await waitFor(() => {
        expect(screen.getByText("Aspirin")).toBeOnTheScreen();
      });

      expect(screen.getByText("100mg")).toBeOnTheScreen();
      expect(screen.getByText("Today's Meds")).toBeOnTheScreen();
    });
  });
});
