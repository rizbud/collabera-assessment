import { render, screen, userEvent } from "@testing-library/react-native";

import i18n from "@/i18n";
import { useLanguageStore } from "@/store";
import { LanguageSwitcher } from "../language-switcher";

beforeEach(async () => {
  await i18n.changeLanguage("en");
});

describe("LanguageSwitcher", () => {
  it("offers both languages and marks the active one", async () => {
    await render(<LanguageSwitcher />);

    expect(screen.getByText("EN")).toBeOnTheScreen();
    expect(screen.getByText("MY")).toBeOnTheScreen();
    expect(screen.getByLabelText("Switch language to EN")).toBeSelected();
    expect(screen.getByLabelText("Switch language to MY")).not.toBeSelected();
  });

  it("switches the language when the other one is pressed", async () => {
    await render(<LanguageSwitcher />);

    await userEvent.press(screen.getByLabelText("Switch language to MY"));

    expect(i18n.language).toBe("ms");
    expect(useLanguageStore.getState().language).toBe("ms");
    expect(screen.getByLabelText("Tukar bahasa ke MY")).toBeSelected();
  });
});
