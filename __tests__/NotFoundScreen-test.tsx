import { render, screen } from "@testing-library/react-native";

import NotFoundScreen from "@/app/+not-found";

jest.mock("expo-router", () => {
  const { Text } = jest.requireActual("react-native");
  return {
    Link: ({ children }: { children: React.ReactNode }) => (
      <Text>{children}</Text>
    ),
    Stack: {
      Screen: () => null,
    },
  };
});

describe("<NotFoundScreen />", () => {
  test("renders the go back link text correctly", () => {
    render(<NotFoundScreen />);
    const element = screen.getByText("Go back to Home screen!");
    expect(element).toBeOnTheScreen();
  });
});
