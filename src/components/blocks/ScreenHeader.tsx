import { View, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Paragraph from "../base/Paragraph";
import IconButton from "../base/IconButton";
import { COLORS } from "../../constants/theme";

interface ScreenHeaderProps {
  location: string;
  locationIcon?: keyof typeof Ionicons.glyphMap;
  onLocationPress?: () => void;
  resultCount?: number | null;
  showFavourites?: boolean;
}

/**
 * Top bar shared by the Results, Map and Favourites tabs.
 */
export default function ScreenHeader({
  location,
  locationIcon = "location-outline",
  onLocationPress,
  resultCount = null,
  showFavourites = true,
}: ScreenHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 pt-3">
      <Pressable
        onPress={onLocationPress}
        disabled={!onLocationPress}
        className="flex-row items-center gap-1 flex-1 pr-3"
        hitSlop={8}
      >
        <Ionicons name={locationIcon} size={14} color={COLORS.primaryDark} />
        <Paragraph
          text={location}
          size="sm"
          numberOfLines={1}
          className="text-primary-dark font-poppins-medium"
        />
      </Pressable>

      <View className="flex-row items-center gap-3">
        {resultCount !== null && resultCount > 0 && (
          <Paragraph text={`${resultCount} ${resultCount === 1 ? "result" : "results"}`} size="sm" muted />
        )}
        {showFavourites && (
          <IconButton
            image="heart"
            color={COLORS.primaryDark}
            onClick={() => router.push("/(tabs)/favourites")}
          />
        )}
      </View>
    </View>
  );
}
