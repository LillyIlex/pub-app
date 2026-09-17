import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

interface TabProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Tab({ icon, text, active = false, onClick }: TabProps) {
  const color = active ? COLORS.primaryDark : COLORS.tabInactive;

  return (
    <Pressable onPress={onClick} className="items-center justify-center flex-1 py-1">
      <View className="items-center">
        <Ionicons name={icon} size={22} color={color} />
        <Text className="font-poppins-medium text-[11px] mt-0.5" style={{ color }}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}
