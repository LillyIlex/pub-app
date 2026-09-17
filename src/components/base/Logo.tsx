import { Pressable, Text } from "react-native";
import { router } from "expo-router";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Pressable onPress={() => router.push("/")} hitSlop={8} className={className}>
      <Text className="font-poppins-bold text-lg text-primary-dark">🍺 PubApp</Text>
    </Pressable>
  );
}
