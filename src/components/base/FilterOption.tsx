import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  return (
    <Pressable
      onPress={onClick}
      className={`flex-row items-center gap-1 rounded-full border px-3 py-3 mr-2 ${
        active ? "bg-active border-active" : "bg-white border-primary-dark"
      } ${className}`}
    >
      {icon && <Ionicons name={icon} size={14} color={active ? "#FFFFFF" : "#007836"} />}
      <Text className={`font-poppins-medium text-xs ${active ? "text-white" : "text-primary-dark"}`}>
        {text}
      </Text>
    </Pressable>
  );
}
