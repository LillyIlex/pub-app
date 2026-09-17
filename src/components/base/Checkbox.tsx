import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Paragraph from "./Paragraph";
import { COLORS } from "../../constants/theme";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  /** "light" = for dark backgrounds. "dark" = for white backgrounds. */
  tone?: "light" | "dark";
}

export default function Checkbox({ label, checked, onToggle, icon, tone = "light" }: CheckboxProps) {
  const color = tone === "light" ? COLORS.surface : COLORS.primaryDark;

  return (
    <Pressable onPress={onToggle} className="flex-row items-center gap-3 py-1.5" hitSlop={4}>
      <Ionicons name={checked ? "checkbox" : "square-outline"} size={20} color={color} />
        <View className="flex-row items-center gap-1" >
            {icon && <Ionicons name={icon} size={16} color={color} />}
            <Paragraph text={label} className={tone === "light" ? "text-surface" : "text-ink"} />
        </View>

    </Pressable>
  );
}
