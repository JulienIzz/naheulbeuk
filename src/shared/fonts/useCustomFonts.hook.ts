import {
  Alegreya_400Regular,
  Alegreya_500Medium,
  Alegreya_600SemiBold,
  Alegreya_700Bold,
} from "@expo-google-fonts/alegreya";
import { useFonts } from "expo-font";

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    Alegreya_400Regular,
    Alegreya_500Medium,
    Alegreya_600SemiBold,
    Alegreya_700Bold,
  });

  return { fontsLoaded };
};
