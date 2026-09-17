/**
 * Single source of truth for colour values.
 *
 * Tailwind classes (`bg-primary`, `text-ink`, ...) are generated from
 * tailwind.config.js, which imports THIS file — so the two can never drift.
 *
 * Use the Tailwind class wherever you can. Use these constants only where a
 * native prop needs a raw colour string and can't accept a className:
 * Ionicons `color`, MapView marker `pinColor`, navigator `screenOptions`,
 * `placeholderTextColor`, ActivityIndicator `color`.
 */
export const COLORS = {
  primary: "#64ED9F",
  primaryLight: "#8FF3B7",
  primaryDark: "#007836",
  surface: "#FFFFFF",
  cream: "#FFFBC7",
  ink: "#0B2B1A",
  link: "#1FAE63",
  active: "#2ECC71",
  activeLight: "#2ECC7150",
  border: "#BFEFD2",
  muted: "#6B8F7C",
  tabInactive: "#8FA99A",
  pillBg: "#E9FBF1",
  // Feature availability pills on venue cards
  yesBg: "#E9FBF1",
  yesText: "#007836",
  noBg: "#FDEBEC",
  noText: "#C0453F",
} as const;

export const FONTS = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semibold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
} as const;

/** Shared corner radius scale — keeps every button/card consistently rounded. */
export const RADIUS = {
  button: "rounded-2xl",
  pill: "rounded-full",
  card: "rounded-3xl",
  sheet: "rounded-t-3xl",
} as const;

/** Uniform card sizing so lists never look ragged. */
export const CARD = {
  listHeight: 150,
  imageWidth: 150,
  mapHeight: 200,
  mapWidth: 300,
  colImageHeight: 96,
} as const;

export type ColorName = keyof typeof COLORS;
