import { Venue } from "@/components/blocks/CardList";

export interface MockVenue extends Venue {
  lat: number;
  lng: number;
  tags: string[];
}

export const MOCK_VENUES: MockVenue[] = [
  {
    id: "1",
    title: "The Fox & Hound",
    subtitle: "Traditional pub · Shoreditch",
    image: { uri: "https://picsum.photos/seed/fox/400/300" },
    tags: ["Dog friendly", "Shows sport"],
    distance: "0.4 mi",
    lat: 51.5265,
    lng: -0.0786,
  },
  {
    id: "2",
    title: "The Green Garden",
    subtitle: "Beer garden · Hackney",
    image: { uri: "https://picsum.photos/seed/garden/400/300" },
    tags: ["Child friendly", "Play area"],
    distance: "0.9 mi",
    lat: 51.5432,
    lng: -0.0553,
  },
  {
    id: "3",
    title: "The Anchor",
    subtitle: "Riverside pub · Bankside",
    image: { uri: "https://picsum.photos/seed/anchor/400/300" },
    tags: ["Dog friendly"],
    distance: "1.2 mi",
    lat: 51.5075,
    lng: -0.0919,
  },
  {
    id: "4",
    title: "The Kings Arms",
    subtitle: "Sports bar · Camden",
    image: { uri: "https://picsum.photos/seed/kings/400/300" },
    tags: ["Shows sport", "Dog friendly"],
    distance: "1.8 mi",
    lat: 51.539,
    lng: -0.1426,
  },
  {
    id: "5",
    title: "The Rose & Crown",
    subtitle: "Family pub · Greenwich",
    image: { uri: "https://picsum.photos/seed/rose/400/300" },
    tags: ["Child friendly", "Play area", "Shows sport"],
    distance: "2.5 mi",
    lat: 51.4826,
    lng: -0.0077,
  },
];
