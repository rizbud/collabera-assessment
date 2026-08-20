// Native modules the app touches, replaced with the smallest thing that behaves
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

// the real provider only renders children after a layout pass, which never
// happens in tests; the library ships a mock with fixed metrics
jest.mock("react-native-safe-area-context", () => ({
  ...jest.requireActual("react-native-safe-area-context"),
  ...require("react-native-safe-area-context/jest/mock").default,
}));

jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageCode: "en", languageTag: "en-MY" }],
}));

jest.mock("expo-clipboard", () => ({
  setStringAsync: jest.fn(async () => true),
  getStringAsync: jest.fn(async () => ""),
}));

jest.mock("expo-sharing", () => ({
  shareAsync: jest.fn(async () => undefined),
}));

jest.mock("expo-router", () => ({
  router: { push: jest.fn(), replace: jest.fn(), back: jest.fn() },
  useLocalSearchParams: jest.fn(() => ({})),
}));

// FlashList v2 schedules an internal animation-frame update after mounting.
// Use its FlatList-compatible implementation in tests so that update does not
// outlive the act scope; recycling behavior needs a device or emulator test.
jest.mock("@shopify/flash-list", () => {
  const { FlatList } = require("react-native");
  return { FlashList: FlatList };
});

jest.mock("react-native-view-shot", () => {
  const { View } = require("react-native");
  return { __esModule: true, default: View };
});

// Toasts go through ToastAndroid/Alert; keep them silent but assertable
jest.spyOn(require("react-native").ToastAndroid, "show").mockImplementation();
jest.spyOn(require("react-native").Alert, "alert").mockImplementation();

afterEach(() => {
  jest.clearAllMocks();
});
