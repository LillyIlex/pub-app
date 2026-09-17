import { FlatList, View, ImageSourcePropType } from "react-native";
import Card from "../group/Card";

export interface Venue {
  id: string;
  title: string;
  subtitle?: string;
  image: ImageSourcePropType;
  tags?: string[];
  distance?: string;
}

interface CardListProps {
  data: Venue[];
  /** "vertical" = full-width rows (search/list screen). "horizontal" = bottom strip on the map screen. */
  layout?: "vertical" | "horizontal";
  onSelect?: (id: string) => void;
}

export default function CardList({ data, layout = "vertical", onSelect }: CardListProps) {
  const isHorizontal = layout === "horizontal";

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={
        isHorizontal ? { paddingHorizontal: 12, gap: 12 } : { padding: 12, gap: 12 }
      }
      renderItem={({ item }) => (
        <View className={isHorizontal ? "" : "w-full"}>
          <Card
            id={item.id}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            tags={item.tags}
            distance={item.distance}
            layout={isHorizontal ? "col" : "row"}
            onClick={() => onSelect?.(item.id)}
          />
        </View>
      )}
    />
  );
}
