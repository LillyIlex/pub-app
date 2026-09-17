import { Pressable, Text, Linking, Platform } from "react-native";

interface AddressProps {
  text: string;
  lat?: number;
  lng?: number;
  className?: string;
}

export default function Address({ text, lat, lng, className = "" }: AddressProps) {
  const openMaps = () => {
    const query = lat && lng ? `${lat},${lng}` : encodeURIComponent(text);
    const url = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`,
      default: `https://www.google.com/maps/search/?api=1&query=${query}`,
    });
    if (url) Linking.openURL(url);
  };

  return (
    <Pressable onPress={openMaps} hitSlop={8}>
      <Text className={`font-poppins-medium text-sm text-link underline ${className}`}>{text}</Text>
    </Pressable>
  );
}
