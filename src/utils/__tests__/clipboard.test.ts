import * as Clipboard from "expo-clipboard";

import i18n from "@/i18n";
import { copyToClipboard, getFromClipboard } from "../clipboard";
import { toast } from "../toast";

jest.mock("../toast");

describe("copyToClipboard", () => {
  it("copies the text and confirms with a toast", async () => {
    await copyToClipboard("123ABC");

    expect(Clipboard.setStringAsync).toHaveBeenCalledWith("123ABC");
    expect(toast).toHaveBeenCalledWith("Copied to clipboard");
  });

  it("confirms in the selected language", async () => {
    await i18n.changeLanguage("ms");
    await copyToClipboard("123ABC");

    expect(toast).toHaveBeenCalledWith("Disalin ke papan klip");

    await i18n.changeLanguage("en");
  });
});

describe("getFromClipboard", () => {
  it("reads the clipboard contents", async () => {
    jest.mocked(Clipboard.getStringAsync).mockResolvedValueOnce("pasted");

    await expect(getFromClipboard()).resolves.toBe("pasted");
  });
});
