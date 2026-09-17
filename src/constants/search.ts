import { Ionicons } from "@expo/vector-icons";

export const DISTANCE_OPTIONS: { label: string; km: number }[] = [
  { label: "3 miles", km: 5 },
  { label: "6 miles", km: 10 },
  { label: "12 miles", km: 20 },
];

export const FEATURE_OPTIONS: { id: string; text: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: "kids", text: "Child friendly", icon: "happy-outline" },
  { id: "dogs", text: "Dog friendly", icon: "paw-outline" },
  { id: "play", text: "Play area", icon: "football-outline" },
  { id: "sport", text: "Shows sport", icon: "tv-outline" },
];
