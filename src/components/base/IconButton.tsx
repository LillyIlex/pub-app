import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

interface IconButtonProps {
  image: keyof typeof Ionicons.glyphMap;
  text?: string;
  onClick?: () => void;
  size?: number;
  color?: string;
  className?: string;
}

export default function IconButton({
  image,
  text,
  onClick,
  size = 22,
  color = COLORS.ink,
  className = "",
}: IconButtonProps) {
  return (
    <Pressable onPress={onClick} hitSlop={8} className={`items-center active:opacity-70 ${className}`}>
      <View className="flex-row items-center gap-1">
        <Ionicons name={image} size={size} color={color} />
        {text ? <Text className="font-poppins-medium text-xs text-ink">{text}</Text> : null}
      </View>
    </Pressable>
  );
}
