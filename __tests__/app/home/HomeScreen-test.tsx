import { fireEvent, render, screen } from "@testing-library/react-native";

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
  };
});

describe("<HomeScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Text renders correctly on HomeScreen", () => {
    render(<HomeScreen />);
    const element = screen.getByText("Beelieve!");
    expect(element).toBeOnTheScreen();
  });

  describe("Header integration", () => {
    test("renders Header with default title", () => {
      render(<HomeScreen />);
      const headerTitle = screen.getByText("Beelieve");
      expect(headerTitle).toBeOnTheScreen();
    });

    test("renders bee icon in Header", () => {
      render(<HomeScreen />);
      const beeIcon = screen.getByTestId("icon-bee");
      expect(beeIcon).toBeOnTheScreen();
    });

    test("Header navigates to home when pressed", () => {
      render(<HomeScreen />);
      const headerTitle = screen.getByText("Beelieve");
      fireEvent.press(headerTitle);
      expect(mockReplace).toHaveBeenCalledWith("/home");
    });
  });
});
