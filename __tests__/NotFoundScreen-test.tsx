import { render } from "@testing-library/react-native";

import NotFoundScreen from "@/app/+not-found";

jest.mock("expo-router", () => {
  const { Text } = require("react-native");
  return {
    Link: ({ children }: { children: React.ReactNode }) => <Text>{children}</Text>,
    Stack: {
      Screen: () => null,
    },
  };
});

describe("<NotFoundScreen />", () => {
  test("renders the go back link text correctly", () => {
    const { getByText } = render(<NotFoundScreen />);

    getByText("Go back to Home screen!");
  });
});

