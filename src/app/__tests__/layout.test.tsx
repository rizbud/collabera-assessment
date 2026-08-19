import { render, screen } from "@testing-library/react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import RootLayout from "../_layout";

jest.mock("expo-font", () => ({ useFonts: jest.fn(() => [true]) }));
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));
jest.mock("expo-router", () => {
  const { View } = require("react-native");
  function Stack({ children }: { children?: React.ReactNode }) {
    return <View testID="stack">{children}</View>;
  }
  Stack.Screen = function Screen({ name }: { name: string }) {
    return <View testID={name} />;
  };
  return {
    Stack,
    router: { push: jest.fn(), replace: jest.fn(), back: jest.fn() },
    useLocalSearchParams: jest.fn(() => ({})),
  };
});

describe("RootLayout", () => {
  it("renders nothing until the fonts are loaded", async () => {
    jest.mocked(useFonts).mockReturnValueOnce([false, null]);

    await render(<RootLayout />);

    expect(screen.queryByTestId("stack")).not.toBeOnTheScreen();
    expect(SplashScreen.hideAsync).not.toHaveBeenCalled();
  });

  it("hides the splash screen and registers every route once loaded", async () => {
    await render(<RootLayout />);

    expect(SplashScreen.hideAsync).toHaveBeenCalled();
    [
      "(home)/index",
      "transactions/index",
      "transactions/[ref-id]",
      "transactions/add",
      "transactions/send",
    ].forEach((route) => expect(screen.getByTestId(route)).toBeOnTheScreen());
  });
});
