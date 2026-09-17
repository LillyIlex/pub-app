import { View, Pressable, Text } from "react-native";
import { DISTANCE_OPTIONS } from "../../constants/search";

interface DistancePillsProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
  /** "light" = on the dark landing background. "dark" = on white. */
  tone?: "light" | "dark";
}

export default function DistancePills({ selectedIndex, onSelect, tone = "light" }: DistancePillsProps) {
  return (
    <View className="flex-row gap-2">
      {DISTANCE_OPTIONS.map((option, i) => {
        const selected = selectedIndex === i;
        const state =
          tone === "light"
            ? selected
              ? "bg-white border-white"
              : "border-white/40"
            : selected
              ? "bg-primary-dark border-primary-dark"
              : "border-primary-dark";
        const textColor =
          tone === "light"
            ? selected
              ? "text-primary-dark font-poppins-semibold"
              : "text-surface"
            : selected
              ? "text-surface font-poppins-semibold"
              : "text-primary-dark";

        return (
          <Pressable
            key={option.label}
            onPress={() => onSelect(i)}
            className={`flex-1 items-center justify-center rounded-full border-2 py-2.5 min-h-[40px] ${state}`}
          >
            <Text
              className={`font-poppins-medium text-s ${textColor}`}
              // style={{ includeFontPadding: false }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
