import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import i18n, { deviceLanguage, isLanguage, type Language } from "@/i18n";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: deviceLanguage(),
      setLanguage: (language) => {
        i18n.changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: "language",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) i18n.changeLanguage(state.language);
      },
    },
  ),
);

// Keep the persisted language in sync however it was changed, including
// useI18n's changeLanguage
i18n.on("languageChanged", (language) => {
  if (isLanguage(language) && language !== useLanguageStore.getState().language) {
    useLanguageStore.setState({ language });
  }
});
