import { fireEvent, render, screen } from "@testing-library/react-native";

import { Header } from "@/components/Header";

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  router: {
    replace: (path: string) => mockReplace(path),
  },
  usePathname: () => "/medications",
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

describe("<Header />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with default title", () => {
    render(<Header />);
    const titleElement = screen.getByText("Beelieve");
    expect(titleElement).toBeOnTheScreen();
  });

  test("renders with custom title", () => {
    render(<Header title="Custom Title" />);
    const titleElement = screen.getByText("Custom Title");
    expect(titleElement).toBeOnTheScreen();
  });

  test("renders bee icon", () => {
    render(<Header />);
    const iconElement = screen.getByTestId("icon-bee");
    expect(iconElement).toBeOnTheScreen();
  });

  test("navigates to home when header is pressed", () => {
    render(<Header />);
    const titleElement = screen.getByText("Beelieve");
    fireEvent.press(titleElement);
    expect(mockReplace).toHaveBeenCalledWith("/home");
  });

  test("navigates to home when custom title is pressed", () => {
    render(<Header title="My App" />);
    const titleElement = screen.getByText("My App");
    fireEvent.press(titleElement);
    expect(mockReplace).toHaveBeenCalledWith("/home");
  });
});
