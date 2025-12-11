import { renderRouter, screen } from "expo-router/testing-library";

/**
 * Integration test to verify the NotFoundScreen is displayed
 * when navigating to an invalid/unmatched URL route.
 */
describe("NotFoundScreen Navigation", () => {
  test("displays NotFoundScreen when navigating to an invalid URL", async () => {
    renderRouter(
      {
        index: () => null,
        "+not-found": () => {
          const { Text } = require("react-native");
          return <Text>Go back to Home screen!</Text>;
        },
      },
      {
        initialUrl: "/invalid-route-that-does-not-exist",
      }
    );

    expect(await screen.findByText("Go back to Home screen!")).toBeTruthy();
  });

  test("displays NotFoundScreen for deeply nested invalid routes", async () => {
    renderRouter(
      {
        index: () => null,
        "+not-found": () => {
          const { Text } = require("react-native");
          return <Text>Go back to Home screen!</Text>;
        },
      },
      {
        initialUrl: "/some/deeply/nested/invalid/path",
      }
    );

    expect(await screen.findByText("Go back to Home screen!")).toBeTruthy();
  });
});

