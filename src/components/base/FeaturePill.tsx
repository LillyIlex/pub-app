import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

interface FeaturePillProps {
  text?: string;
  icon: keyof typeof Ionicons.glyphMap;
  available: boolean;
  className?: string;
}

/**
 * Shows a venue feature as present (green, feature icon) or absent
 * (muted red, cross icon).
 */
export default function FeaturePill({ text, icon, available, className = "" }: FeaturePillProps) {
  return (
    <View
      className={`flex-row items-center justify-center gap-2 rounded-full px-3 py-2 ${className}`}
      style={{ backgroundColor: available ? COLORS.yesBg : COLORS.noBg, opacity: available ? 1 : 0.7 }}
    >
      <Ionicons
        name={icon}
        size={13}
        color={available ? COLORS.yesText : COLORS.noText}
      />
        {text &&  <Text
        className="font-poppins-medium text-[12px]"
        style={{ color: available ? COLORS.yesText : COLORS.noText, includeFontPadding: false }}
      >
        {text}
      </Text>}
    </View>
  );
}
