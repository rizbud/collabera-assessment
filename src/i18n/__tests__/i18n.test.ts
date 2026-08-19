import i18n, { dateLocale, deviceLanguage, isLanguage, LANGUAGES } from "..";
import en from "../locales/en.json";
import ms from "../locales/ms.json";

type Leaves = Record<string, string>;

const flatten = (value: object, prefix = ""): Leaves =>
  Object.entries(value).reduce<Leaves>(
    (acc, [key, child]) =>
      typeof child === "object"
        ? { ...acc, ...flatten(child, `${prefix}${key}.`) }
        : { ...acc, [`${prefix}${key}`]: child },
    {},
  );

const placeholders = (value: string) => (value.match(/{{\w+}}/g) ?? []).sort();

afterEach(async () => {
  await i18n.changeLanguage("en");
});

describe("i18n setup", () => {
  it("ships English and Malay", () => {
    expect(LANGUAGES.map((l) => l.code)).toEqual(["en", "ms"]);
    expect(i18n.language).toBe("en");
  });

  it("starts from the device language, falling back to English", () => {
    expect(deviceLanguage()).toBe("en");
  });

  it("recognizes only the languages it ships", () => {
    expect(isLanguage("ms")).toBe(true);
    expect(isLanguage("de")).toBe(false);
    expect(isLanguage(undefined)).toBe(false);
  });

  it("keeps the Malaysian region for dates in both languages", async () => {
    expect(dateLocale()).toBe("en-MY");

    await i18n.changeLanguage("ms");
    expect(dateLocale()).toBe("ms-MY");
  });
});

describe("translation files", () => {
  const english = flatten(en);
  const malay = flatten(ms);

  it("define the same keys", () => {
    expect(Object.keys(malay).sort()).toEqual(Object.keys(english).sort());
  });

  it("use the same interpolation placeholders per key", () => {
    Object.entries(english).forEach(([key, value]) => {
      expect(placeholders(malay[key])).toEqual(placeholders(value));
    });
  });

  it("leave no value empty", () => {
    Object.values({ ...english, ...malay }).forEach((value) => {
      expect(value.trim()).not.toBe("");
    });
  });
});
