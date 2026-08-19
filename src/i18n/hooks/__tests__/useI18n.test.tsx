import { act, renderHook } from "@testing-library/react-native";

import i18n from "@/i18n";
import { useI18n } from "../useI18n";

beforeEach(async () => {
  await i18n.changeLanguage("en");
});

describe("useI18n", () => {
  it("translates with the current language", async () => {
    const { result } = await renderHook(() => useI18n());

    expect(result.current.currentLanguage).toBe("en");
    expect(result.current.t("transactions.title")).toBe("Transaction History");
  });

  it("interpolates values", async () => {
    const { result } = await renderHook(() => useI18n());

    expect(result.current.t("home.greeting.morning", { name: "John" })).toBe(
      "Good morning, John!",
    );
  });

  it("re-renders with the new language after changeLanguage", async () => {
    const { result } = await renderHook(() => useI18n());

    await act(() => result.current.changeLanguage("ms"));

    expect(result.current.currentLanguage).toBe("ms");
    expect(result.current.t("transactions.title")).toBe("Sejarah Transaksi");
  });

  it("falls back to English for a key the other language is missing", async () => {
    await i18n.changeLanguage("ms");
    const { result } = await renderHook(() => useI18n());

    expect(result.current.t("common.back")).toBe("Kembali");
    expect(result.current.t("nope.missing")).toBe("nope.missing");
  });
});
