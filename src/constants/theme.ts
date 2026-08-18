export const Colors = {
  text: "#000000",
  background: "#ffffff",
  backgroundElement: "#F0F0F3",
  backgroundSelected: "#E0E1E6",
  textSecondary: "#60646C",
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
