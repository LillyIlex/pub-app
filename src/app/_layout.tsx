import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {FavouritesProvider} from "@/context/FavouritesContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
      <FavouritesProvider>
      <Stack screenOptions={{ headerTitleStyle: { fontFamily: "Poppins_600SemiBold" } }}>
      <Stack screenOptions={{ headerTitleStyle: { fontFamily: "Poppins_600SemiBold" } }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack.Screen options={{ headerShown: false }} />
      <Stack.Screen
        name="venue/[id]"
        options={{
          presentation: "modal",
          title: "Venue details",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen name="+not-found" options={{ title: "Not found" }} />
    </Stack>
      </Stack>
      </FavouritesProvider>
  );
}
