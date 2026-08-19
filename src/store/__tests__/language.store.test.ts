import AsyncStorage from "@react-native-async-storage/async-storage";

import i18n from "@/i18n";
import { useLanguageStore } from "../language.store";

const state = () => useLanguageStore.getState();

beforeEach(async () => {
  await i18n.changeLanguage("en");
  useLanguageStore.setState({ language: "en" });
});

describe("useLanguageStore", () => {
  it("defaults to the device language", () => {
    expect(state().language).toBe("en");
  });

  it("changes i18n when the language is set", () => {
    state().setLanguage("ms");

    expect(state().language).toBe("ms");
    expect(i18n.language).toBe("ms");
  });

  it("follows a change made through i18n directly, so useI18n also persists", async () => {
    await i18n.changeLanguage("ms");

    expect(state().language).toBe("ms");
  });

  it("persists the language under its own storage key", async () => {
    state().setLanguage("ms");
    await useLanguageStore.persist.rehydrate();

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "language",
      expect.stringContaining('"language":"ms"'),
    );
    expect(state().language).toBe("ms");
  });
});
