// src/components/blocks/FiltersList.tsx
import { ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FilterOption from "../base/FilterOption";
import Paragraph from "../base/Paragraph";

export interface FilterDef {
    id: string;
    text: string;
    icon?: keyof typeof Ionicons.glyphMap;
}

interface FiltersListProps {
    filters: FilterDef[];
    activeIds: string[];
    onToggle: (id: string) => void;
    onClearAll?: () => void;
    visible: boolean;
}

export default function FiltersList({ filters, activeIds, onToggle, onClearAll, visible }: FiltersListProps) {
    if (!visible) return null;

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="bg-surface px-3 min-h-10 mb-2"
            contentContainerStyle={{ alignItems: "center" }}
        >
            {filters.map((filter) => (
                <FilterOption
                    key={filter.id}
                    text={filter.text}
                    icon={filter.icon}
                    active={activeIds.includes(filter.id)}
                    onClick={() => onToggle(filter.id)}
                />
            ))}
            {activeIds.length > 0 && onClearAll && (
                <Pressable onPress={onClearAll} className="px-2 py-1.5">
                    <Paragraph text="Clear all" size="sm" className="text-link font-poppins-medium underline" />
                </Pressable>
            )}
        </ScrollView>
    );
}