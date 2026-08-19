import { render, screen, userEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import i18n from "@/i18n";
import { Header } from "../header";

afterEach(async () => {
  await i18n.changeLanguage("en");
});

describe("Header", () => {
  it("shows the title with a back button and the language switcher", async () => {
    await render(<Header title="Transaction History" />);

    expect(screen.getByText("Transaction History")).toBeOnTheScreen();
    expect(screen.getByLabelText("Back")).toBeEnabled();
    expect(screen.getByText("EN")).toBeOnTheScreen();
  });

  it("goes back when the back button is pressed", async () => {
    await render(<Header title="Transaction History" />);

    await userEvent.press(screen.getByLabelText("Back"));

    expect(router.back).toHaveBeenCalled();
  });

  it("disables going back when the screen is the root", async () => {
    await render(<Header title="Home" canGoBack={false} />);

    expect(screen.getByLabelText("Back")).toBeDisabled();
  });

  it("translates the back label", async () => {
    await i18n.changeLanguage("ms");
    await render(<Header title="Sejarah Transaksi" />);

    expect(screen.getByLabelText("Kembali")).toBeOnTheScreen();
  });
});
