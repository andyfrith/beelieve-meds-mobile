import { act, render, screen } from "@testing-library/react-native";

import SplashScreen from "@/app/index";

jest.mock("expo-router", () => {
  const { View } = jest.requireActual("react-native");
  return {
    useRouter: () => ({
      replace: jest.fn(),
    }),
    Link: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
  };
});

jest.mock("expo-linear-gradient", () => {
  const { View } = jest.requireActual("react-native");
  return {
    LinearGradient: ({ children, style }: { children: React.ReactNode; style?: object }) => (
      <View style={style}>{children}</View>
    ),
  };
});

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

describe("<SplashScreen />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("Text renders correctly on SplashScreen", async () => {
    render(<SplashScreen />);

    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    const element = screen.getByText("Beelieve");
    expect(element).toBeOnTheScreen();
  });

  test("renders bee icon on SplashScreen", async () => {
    render(<SplashScreen />);

    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    const beeIcon = screen.getByTestId("icon-bee");
    expect(beeIcon).toBeOnTheScreen();
  });

  test("renders subtitle text on SplashScreen", async () => {
    render(<SplashScreen />);

    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    const subtitle = screen.getByText("... in yourself");
    expect(subtitle).toBeOnTheScreen();
  });
});
