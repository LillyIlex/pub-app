import { FlatList, View, ImageSourcePropType } from "react-native";
import Card from "../group/Card";
import { FeatureMap } from "../../data/mockVenues";

export interface Venue {
  id: string;
  title: string;
  subtitle?: string;
  image: ImageSourcePropType;
  features?: FeatureMap;
  distance?: string;
}

interface CardListProps {
  data: Venue[];
  /** Ask before removing a favourite (used in the Favourites tab). */
  confirmRemove?: boolean;
  /** "vertical" = full-width rows. "horizontal" = wider strip on the map screen. */
  layout?: "vertical" | "horizontal";
  onSelect?: (id: string) => void;
}

export default function CardList({ data, layout = "vertical", confirmRemove = false, onSelect }: CardListProps) {
  const isHorizontal = layout === "horizontal";

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={
        isHorizontal ? { paddingHorizontal: 16, gap: 12 } : { padding: 16, gap: 12 }
      }
      renderItem={({ item }) => (
        <View className={isHorizontal ? "" : "w-full"}>
          <Card
            id={item.id}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            features={item.features}
            distance={item.distance}
            layout={isHorizontal ? "col" : "row"}
            confirmRemove={confirmRemove}
            onClick={() => onSelect?.(item.id)}
          />
        </View>
      )}
    />
  );
}
