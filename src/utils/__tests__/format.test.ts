import i18n from "@/i18n";
import { formatDatetime, formatMonthYear } from "../format-date";
import { formatCurrency, formatNumber } from "../format-number";
import { greetingKey } from "../greeting";

const date = "2024-07-28T19:41:03Z";

// Intl separates the currency symbol with a non-breaking space
const normalize = (value: string) => value.replace(/ /g, " ");

afterEach(async () => {
  await i18n.changeLanguage("en");
  jest.useRealTimers();
});

describe("formatCurrency / formatNumber", () => {
  it("formats as Malaysian ringgit", () => {
    expect(normalize(formatCurrency(1500))).toBe("RM 1,500.00");
    expect(normalize(formatCurrency(-320.4))).toBe("-RM 320.40");
    expect(normalize(formatNumber(1234.5))).toBe("1,234.5");
  });

  it("keeps the currency format when the language changes", async () => {
    const english = formatCurrency(1500);
    await i18n.changeLanguage("ms");

    expect(formatCurrency(1500)).toBe(english);
  });
});

describe("formatDatetime", () => {
  it("follows the selected language", async () => {
    expect(formatDatetime(date)).toContain("2024");
    expect(formatMonthYear(date)).toBe("July 2024");

    await i18n.changeLanguage("ms");
    expect(formatMonthYear(date)).toBe("Julai 2024");
  });

  it("accepts an explicit locale", () => {
    expect(formatMonthYear(date, "ms-MY")).toBe("Julai 2024");
  });
});

describe("greetingKey", () => {
  it.each([
    ["2024-07-28T08:00:00", "home.greeting.morning"],
    ["2024-07-28T12:00:00", "home.greeting.afternoon"],
    ["2024-07-28T17:59:00", "home.greeting.afternoon"],
    ["2024-07-28T18:00:00", "home.greeting.evening"],
    ["2024-07-28T23:30:00", "home.greeting.evening"],
  ])("returns %s -> %s", (now, expected) => {
    jest.useFakeTimers().setSystemTime(new Date(now));

    expect(greetingKey()).toBe(expected);
  });

  it("resolves to text in both languages", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-07-28T08:00:00"));

    expect(i18n.t(greetingKey(), { name: "John" })).toBe("Good morning, John!");
    await i18n.changeLanguage("ms");
    expect(i18n.t(greetingKey(), { name: "John" })).toBe("Selamat pagi, John!");
  });
});
