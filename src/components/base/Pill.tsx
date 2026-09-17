import { View, Text } from "react-native";

interface PillProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export default function Pill({
  text,
  bgColor = "#E9FBF1",
  textColor = "#007836",
  className = "",
}: PillProps) {
  return (
    <View className={`rounded-full px-3 py-1 ${className}`} style={{ backgroundColor: bgColor }}>
      <Text className="font-poppins-medium text-xs" style={{ color: textColor }}>
        {text}
      </Text>
    </View>
  );
}
