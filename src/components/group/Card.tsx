import { View, Pressable, ImageSourcePropType, Image as RNImage } from "react-native";
import Title from "../base/Title";
import Paragraph from "../base/Paragraph";
import FeaturePill from "../base/FeaturePill";
import FavouriteToggle from "./FavouriteToggle";
import { FEATURE_OPTIONS } from "@/constants/search";
import { CARD } from "@/constants/theme";
import { FeatureMap } from "@/data/mockVenues";

interface CardProps {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle?: string;
  features?: FeatureMap;
  distance?: string;
  /** "row" = image left / info right (vertical list). "col" = image on top (map strip). */
  layout?: "row" | "col";
  /** Card taps ask before removing a favourite; the favourites list does. */
  confirmRemove?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  id,
  image,
  title,
  subtitle,
  features = {},
  distance,
  layout = "row",
  confirmRemove = false,
  onClick,
  className = "",
}: CardProps) {
  const isRow = layout === "row";

  const available = FEATURE_OPTIONS.filter((f) => features[f.id]);
  const unavailable = FEATURE_OPTIONS.filter((f) => !features[f.id]);

  return (
    <Pressable
      onPress={onClick}
      style={{
        height: isRow ? CARD.listHeight : CARD.mapHeight,
        width: isRow ? undefined : CARD.mapWidth,
      }}
      className={`relative bg-white rounded-2xl overflow-hidden border border-border ${
        isRow ? "flex-row" : ""
      } ${className}`}
    >
      {/* Explicit dimensions — percentage classNames don't resolve on RN Image. */}
      <RNImage
        source={image}
        resizeMode="cover"
        style={
          isRow
            ? { width: CARD.imageWidth, height: "100%" }
            : { width: "100%", height: CARD.colImageHeight }
        }
      />

      <View className="flex-1 p-3 pr-9 gap-y-2 justify-between">
        <View className="gap-0.5">
          <Title text={title} size="sm" numberOfLines={1} />
          {subtitle ? <Paragraph text={subtitle} size="sm" muted numberOfLines={1} /> : null}
        </View>
<View className={`flex items-center justify-between gap-6 ${isRow ? "flex-col" : "flex-row"}`}>
        {/* Available features on the top row, missing ones underneath. */}
        <View className={`gap-1 ${isRow ? "flex-col" : "flex-row"}`}>
          {available.length > 0 && (
            <View className="flex-row flex-wrap gap-1">
              {available.map((f) => (
                <FeaturePill key={f.id} icon={f.icon} available />
              ))}
            </View>
          )}
          {unavailable.length > 0 && (
            <View className="flex-row flex-wrap gap-1">
              {unavailable.map((f) => (
                <FeaturePill key={f.id} icon={f.icon} available={false} />
              ))}
            </View>
          )}
        </View>

        {distance ? (
          <Paragraph text={distance} size="sm" className="text-link font-poppins-medium" />
        ) : null}
      </View>

      </View>
      <View className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5">
        <FavouriteToggle
          venue={{ id, title, subtitle, image, features, distance }}
          confirmRemove={confirmRemove}
        />
      </View>
    </Pressable>
  );
}
