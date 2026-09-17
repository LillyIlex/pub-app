import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

interface FavouritesButtonProps {
  active: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
}

export default function FavouritesButton({
  active,
  onToggle,
  size = 22,
  className = "",
}: FavouritesButtonProps) {
  return (
    <Pressable onPress={onToggle} hitSlop={8} className={`active:opacity-70 ${className}`}>
      <Ionicons
        name={active ? "heart" : "heart-outline"}
        size={size}
        color={active ? COLORS.primaryDark : COLORS.ink}
      />
    </Pressable>
  );
}
