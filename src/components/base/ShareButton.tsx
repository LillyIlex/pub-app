import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Share } from "react-native";

interface ShareButtonProps {
  title: string;
  url: string;
  size?: number;
  className?: string;
}

export default function ShareButton({ title, url, size = 20, className = "" }: ShareButtonProps) {
  const onShare = () => {
    Share.share({ message: `${title} — ${url}`, url, title });
  };

  return (
    <Pressable onPress={onShare} hitSlop={8} className={`active:opacity-70 ${className}`}>
      <Ionicons name="share-outline" size={size} color="#0B2B1A" />
    </Pressable>
  );
}
