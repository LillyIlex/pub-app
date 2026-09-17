import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface VenueDetailProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  className?: string;
}

export default function VenueDetail({ icon, text, className = "" }: VenueDetailProps) {
  return (
    <View className={`flex-row items-center gap-2 ${className}`}>
      <Ionicons name={icon} size={16} color="#007836" />
      <Text className="font-poppins text-sm text-ink">{text}</Text>
    </View>
  );
}
