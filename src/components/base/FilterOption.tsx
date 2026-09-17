import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

interface FilterOptionProps {
  text: string;
  icon?: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function FilterOption({
  text,
  icon,
  active = false,
  onClick,
  className = "",
}: FilterOptionProps) {
  const fg = active ? COLORS.surface : COLORS.primaryDark;

  return (
    <Pressable
      onPress={onClick}
      className={`flex-row items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 min-h-[36px] mr-2 ${
        active ? "bg-activeLight border-activeLight" : "bg-white border-primary-dark"
      } ${className}`}
    >
      {icon && <Ionicons name={icon} size={16} color={COLORS.primaryDark} />}
      <Text
        className={`font-poppins-bold text-xs leading-none pt-[4px] ${active ? "text-primary-dark" : "text-primary-dark"}`}
        // style={{ includeFontPadding: false }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
