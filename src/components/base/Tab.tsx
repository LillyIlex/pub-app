import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TabProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Tab({ icon, text, active = false, onClick }: TabProps) {
  const color = active ? "#007836" : "#8FA99A";

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
