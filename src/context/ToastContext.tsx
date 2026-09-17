import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { COLORS } from "@/constants/theme";

interface ToastState {
  message: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface ToastContextValue {
  showToast: (message: string, icon?: keyof typeof Ionicons.glyphMap) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const DURATION_MS = 2200;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, icon: keyof typeof Ionicons.glyphMap = "heart") => {
    if (timeout.current) clearTimeout(timeout.current);
    setToast({ message, icon });
    timeout.current = setTimeout(() => setToast(null), DURATION_MS);
  }, []);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View
          entering={FadeInDown.duration(180)}
          exiting={FadeOutDown.duration(180)}
          pointerEvents="none"
          // Sits above the tab bar so it never covers the nav.
          style={{ position: "absolute", left: 0, right: 0, bottom: 96, alignItems: "center" }}
        >
          <View className="flex-row items-center gap-2 bg-ink/95 rounded-full px-4 py-3 shadow-lg">
            <Ionicons name={toast.icon} size={16} color={COLORS.primary} />
            <Text className="font-poppins-medium text-sm text-white">{toast.message}</Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
