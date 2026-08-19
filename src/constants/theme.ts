export const Colors = {
  foreground: "#000000",
  background: "#FFFFFF",
  primary: "#6057FF",
  primaryDark: "#4B3DFF",
  gray: "#595959",
  lightGray: "#E0E0E0",
} as const;

export type ThemeColor = keyof typeof Colors;

export const Fonts = {
  regular: "NunitoSans_400Regular",
  medium: "NunitoSans_500Medium",
  semiBold: "NunitoSans_600SemiBold",
  bold: "NunitoSans_700Bold",
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;
