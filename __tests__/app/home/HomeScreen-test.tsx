import { render, screen } from "@testing-library/react-native";

import HomeScreen from "@/app/home/index";

describe("<HomeScreen />", () => {
  test("Text renders correctly on HomeScreen", () => {
    render(<HomeScreen />);
    const element = screen.getByText("Beelieve!");
    expect(element).toBeOnTheScreen();
  });
});
