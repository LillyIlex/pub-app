import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

interface FilterButtonProps {
  open: boolean;
  onClick: () => void;
  className?: string;
}

export default function FilterButton({ open, onClick, className = "" }: FilterButtonProps) {
  return (
    <Pressable
      onPress={onClick}
      className={`flex-row items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 min-h-[40px] border-[1px] ${
        open ? "border-active" : "border-primary-dark"
      } ${className}`}
    >
      <Ionicons
        name="options-outline"
        size={16}
        color={open ? COLORS.active : COLORS.primaryDark}
      />
      <Text
        className={`font-poppins-bold text-xs leading-none ${open ? "text-active" : "text-primary-dark"}`}
        style={{ includeFontPadding: false }}
      >
        Filters
      </Text>
    </Pressable>
  );
}
