import { render, screen } from "@testing-library/react-native";

import SplashScreen from "@/app/index";

describe("<SplashScreen />", () => {
  test("Text renders correctly on SplashScreen", () => {
    render(<SplashScreen />);
    const element = screen.getByText("Beelieve");
    expect(element).toBeOnTheScreen();
  });
});
