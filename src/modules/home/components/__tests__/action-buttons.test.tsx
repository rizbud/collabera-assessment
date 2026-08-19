import { render, screen, userEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import i18n from "@/i18n";
import { ActionButtons } from "../action-buttons";

afterEach(async () => {
  await i18n.changeLanguage("en");
});

describe("ActionButtons", () => {
  it("offers the four actions", async () => {
    await render(<ActionButtons />);

    ["Add", "Send", "History", "More"].forEach((label) => {
      expect(screen.getByLabelText(label)).toBeOnTheScreen();
    });
  });

  it.each([
    ["Add", "/transactions/add"],
    ["Send", "/transactions/send"],
    ["History", "/transactions"],
  ])("navigates from %s to %s", async (label, path) => {
    await render(<ActionButtons />);

    await userEvent.press(screen.getByLabelText(label));

    expect(router.push).toHaveBeenCalledWith(path);
  });

  it("has nowhere to go for More yet", async () => {
    jest.spyOn(console, "log").mockImplementation();
    await render(<ActionButtons />);

    await userEvent.press(screen.getByLabelText("More"));

    expect(router.push).not.toHaveBeenCalled();
  });

  it("translates the labels", async () => {
    await i18n.changeLanguage("ms");
    await render(<ActionButtons />);

    ["Tambah", "Hantar", "Sejarah", "Lagi"].forEach((label) => {
      expect(screen.getByLabelText(label)).toBeOnTheScreen();
    });
  });
});
