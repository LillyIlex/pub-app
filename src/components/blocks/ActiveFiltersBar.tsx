import { ScrollView, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Paragraph from "../base/Paragraph";
import FilterOption from "../base/FilterOption";
import { FEATURE_OPTIONS, DISTANCE_OPTIONS } from "../../constants/search";
import { COLORS } from "../../constants/theme";

interface ActiveFiltersBarProps {
  activeIds: string[];
  distanceIndex: number;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

/**
 * Shows the current distance plus only the filters actually applied. The full
 * option set lives in FiltersDrawer.
 */
export default function ActiveFiltersBar({
  activeIds,
  distanceIndex,
  onRemove,
  onClearAll,
}: ActiveFiltersBarProps) {
  const active = FEATURE_OPTIONS.filter((f) => activeIds.includes(f.id));

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="bg-surface px-4 py-2"
      contentContainerStyle={{ alignItems: "center", paddingRight: 8 }}
    >
      {/* The only visual feedback for distance. */}
      <View className="flex-row items-center justify-center gap-1.5 rounded-full bg-white border border-border px-4 py-2.5 min-h-[36px] mr-2">
        <Ionicons name="navigate-outline" size={14} color={COLORS.primaryDark} />
        <Paragraph
          text={DISTANCE_OPTIONS[distanceIndex].label}
          size="sm"
          className="text-primary-dark font-poppins-medium"
        />
      </View>

      {active.map((f) => (
        <FilterOption key={f.id} text={f.text} icon={f.icon} active onClick={() => onRemove(f.id)} />
      ))}

      {active.length > 0 && (
        <Pressable onPress={onClearAll} className="px-2 py-2" hitSlop={8}>
          <Paragraph text="Clear all" size="sm" className="text-link font-poppins-medium underline" />
        </Pressable>
      )}
    </ScrollView>
  );
}
