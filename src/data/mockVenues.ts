import { ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/** Every feature id from FEATURE_OPTIONS maps to true/false on each venue. */
export type FeatureMap = Record<string, boolean>;

export interface MockVenue {
  id: string;
  title: string;
  subtitle?: string;
  image: ImageSourcePropType;
  features: FeatureMap;
  distance?: string;
  lat: number;
  lng: number;
  address: string;
  description: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  priceRange?: string;
  rating?: number;
  details: { icon: keyof typeof Ionicons.glyphMap; text: string }[];
}

export const MOCK_VENUES: MockVenue[] = [
  {
    id: "1",
    title: "The Fox & Hound",
    subtitle: "Traditional pub · Shoreditch",
    image: { uri: "https://picsum.photos/seed/fox/600/400" },
    features: { kids: false, dogs: true, play: false, sport: true, garden: false, parking: true },
    distance: "0.4 mi",
    lat: 51.5265,
    lng: -0.0786,
    address: "12 Shoreditch High St, London E1 6PG",
    description:
      "A proper old boozer with worn leather benches, a roaring fire in winter, and three screens showing the football. Dogs get a biscuit at the bar. Expect a lively crowd on match days and a quieter, more local feel midweek.",
    phone: "020 7946 0112",
    website: "https://example.com/fox-and-hound",
    openingHours: "Mon–Sun, 12pm – 11pm",
    priceRange: "££",
    rating: 4.4,
    details: [
      { icon: "paw-outline", text: "Dogs welcome throughout" },
      { icon: "tv-outline", text: "Sky Sports & TNT Sports" },
      { icon: "restaurant-outline", text: "Kitchen until 9pm" },
      { icon: "car-outline", text: "Street parking nearby" },
    ],
  },
  {
    id: "2",
    title: "The Green Garden",
    subtitle: "Beer garden · Hackney",
    image: { uri: "https://picsum.photos/seed/garden/600/400" },
    features: { kids: true, dogs: true, play: true, sport: false, garden: true, parking: false },
    distance: "0.9 mi",
    lat: 51.5432,
    lng: -0.0553,
    address: "45 Mare St, London E8 4RT",
    description:
      "Huge sun-trap garden with a fenced-off play area, picnic benches, and a proper kids' menu. Weekend brunch gets busy — worth booking ahead if you want a table in the shade.",
    phone: "020 7946 0233",
    website: "https://example.com/green-garden",
    openingHours: "Mon–Sun, 11am – 11pm",
    priceRange: "££",
    rating: 4.7,
    details: [
      { icon: "happy-outline", text: "Children welcome until 8pm" },
      { icon: "football-outline", text: "Enclosed play area" },
      { icon: "leaf-outline", text: "Large beer garden" },
      { icon: "restaurant-outline", text: "Kids' menu available" },
    ],
  },
  {
    id: "3",
    title: "The Anchor",
    subtitle: "Riverside pub · Bankside",
    image: { uri: "https://picsum.photos/seed/anchor/600/400" },
    features: { kids: false, dogs: true, play: false, sport: false, garden: true, parking: false },
    distance: "1.2 mi",
    lat: 51.5075,
    lng: -0.0919,
    address: "34 Park St, London SE1 9EF",
    description:
      "Seventeenth-century riverside inn with low beams and a terrace looking out over the Thames. Cosy inside, packed outside on a sunny day. No screens, no music — just conversation.",
    phone: "020 7946 0344",
    website: "https://example.com/the-anchor",
    openingHours: "Mon–Sun, 12pm – 11pm",
    priceRange: "£££",
    rating: 4.2,
    details: [
      { icon: "paw-outline", text: "Dogs welcome in the bar" },
      { icon: "leaf-outline", text: "Riverside terrace" },
      { icon: "wine-outline", text: "Extensive wine list" },
    ],
  },
  {
    id: "4",
    title: "The Kings Arms",
    subtitle: "Sports bar · Camden",
    image: { uri: "https://picsum.photos/seed/kings/600/400" },
    features: { kids: false, dogs: true, play: false, sport: true, garden: false, parking: true },
    distance: "1.8 mi",
    lat: 51.539,
    lng: -0.1426,
    address: "7 Camden High St, London NW1 7JE",
    description:
      "Six screens, a projector for the big games, and a decent range of cask ale. Gets loud on match days — arrive early for a seat with a view of the main screen.",
    phone: "020 7946 0455",
    website: "https://example.com/kings-arms",
    openingHours: "Mon–Sun, 12pm – 12am",
    priceRange: "££",
    rating: 4.0,
    details: [
      { icon: "tv-outline", text: "6 screens + projector" },
      { icon: "beer-outline", text: "8 cask ales on rotation" },
      { icon: "paw-outline", text: "Dogs welcome" },
      { icon: "car-outline", text: "Car park at rear" },
    ],
  },
  {
    id: "5",
    title: "The Rose & Crown",
    subtitle: "Family pub · Greenwich",
    image: { uri: "https://picsum.photos/seed/rose/600/400" },
    features: { kids: true, dogs: true, play: true, sport: true, garden: true, parking: true },
    distance: "2.5 mi",
    lat: 51.4826,
    lng: -0.0077,
    address: "22 Greenwich Church St, London SE10 9BJ",
    description:
      "Roomy family pub near the park with a climbing frame out back, high chairs, and a Sunday roast worth the walk. Ticks just about every box.",
    phone: "020 7946 0566",
    website: "https://example.com/rose-and-crown",
    openingHours: "Mon–Sun, 11am – 10:30pm",
    priceRange: "££",
    rating: 4.6,
    details: [
      { icon: "happy-outline", text: "High chairs & kids' menu" },
      { icon: "football-outline", text: "Outdoor climbing frame" },
      { icon: "leaf-outline", text: "Beer garden" },
      { icon: "car-outline", text: "Free car park" },
    ],
  },
];

export function getMockVenueById(id: string): MockVenue | undefined {
  return MOCK_VENUES.find((v) => v.id === id);
}
