import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { COLORS } from "@/constants/theme";

interface CurrentLocationProps {
  onPress?: () => void;
  className?: string;
}

export default function CurrentLocation({ onPress, className = "" }: CurrentLocationProps) {
  const [label, setLabel] = useState("Set location");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const position = await Location.getCurrentPositionAsync({});
      const [place] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      if (place?.city) setLabel(place.city);
    })();
  }, []);

  return (
    <Pressable onPress={onPress} hitSlop={8} className={`flex-row items-center gap-1 ${className}`}>
      <Ionicons name="location-outline" size={16} color={COLORS.primaryDark} />
      <Text className="font-poppins-medium text-s text-primary-dark">{label}</Text>
    </Pressable>
  );
}
