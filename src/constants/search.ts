import { Ionicons } from "@expo/vector-icons";

export const DISTANCE_OPTIONS: { label: string; km: number }[] = [
  { label: "1 mile", km: 1.6 },
  { label: "3 miles", km: 5 },
  { label: "5 miles", km: 8 },
];

export interface FeatureOption {
  id: string;
  text: string;
  /** Short label for the compact pills on venue cards. */
  shortText: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const FEATURE_OPTIONS: FeatureOption[] = [
  { id: "kids", text: "Child friendly", shortText: "Kids", icon: "happy-outline" },
  { id: "dogs", text: "Dog friendly", shortText: "Dogs", icon: "paw-outline" },
  { id: "play", text: "Play area", shortText: "Play area", icon: "football-outline" },
  { id: "sport", text: "Shows sport", shortText: "Sport", icon: "tv-outline" },
  { id: "garden", text: "Beer garden", shortText: "Garden", icon: "leaf-outline" },
  { id: "parking", text: "Car park", shortText: "Parking", icon: "car-outline" },
];

export const DEFAULT_DISTANCE_INDEX = 1; // 3 miles

/**
 * Ranks venues by how many of the requested features they actually have, so
 * the best matches surface first. Ties keep their original (distance) order.
 */
export function sortByFilterMatch<T extends { features?: Record<string, boolean> }>(
  venues: T[],
  activeIds: string[]
): T[] {
  if (activeIds.length === 0) return venues;
  return [...venues]
    .map((venue, index) => ({
      venue,
      index,
      matches: activeIds.filter((id) => venue.features?.[id]).length,
    }))
    .sort((a, b) => b.matches - a.matches || a.index - b.index)
    .map((entry) => entry.venue);
}
