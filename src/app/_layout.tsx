import "../global.css";
import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { messages } from "../locales/en/messages";
import { messages as frmessages } from "../locales/fr/messages";

export default function Layout() {
  let [fontsLoaded, fontError] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  i18n.load({ en: messages, fr: frmessages });
  i18n.activate("fr");

  return (
    <I18nProvider i18n={i18n}>
      <Slot />
    </I18nProvider>
  );
}
