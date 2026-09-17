import "../global.css";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { FavouritesProvider } from "@/context/FavouritesContext";
import { ToastProvider } from "@/context/ToastContext";
import { COLORS, FONTS } from "@/constants/theme";

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
      <ToastProvider>
        <Stack
          screenOptions={{
            headerTitleStyle: { fontFamily: FONTS.semibold, color: COLORS.ink },
            headerStyle: { backgroundColor: COLORS.surface },
            headerShadowVisible: false,
            headerTintColor: COLORS.primaryDark,
            headerBackButtonDisplayMode: "minimal",
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="venue/[id]"
            options={{
              presentation: "modal",
              title: "Venue details",
              // Modal still swipes down to dismiss; this adds an explicit X.
              headerLeft: () => (
                <Pressable onPress={() => router.back()} hitSlop={10}>
                  <Ionicons name="close" size={26} color={COLORS.ink} />
                </Pressable>
              ),
            }}
          />
          <Stack.Screen name="+not-found" options={{ title: "Not found" }} />
        </Stack>
      </ToastProvider>
    </FavouritesProvider>
  );
}
