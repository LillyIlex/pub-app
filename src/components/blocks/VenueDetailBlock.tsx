import { ScrollView, View, ImageSourcePropType } from "react-native";
import Image from "../base/Image";
import Title from "../base/Title";
import Paragraph from "../base/Paragraph";
import Pill from "../base/Pill";
import Address from "../base/Address";
import VenueDetail from "../base/VenueDetail";
import ShareButton from "../base/ShareButton";
import { Ionicons } from "@expo/vector-icons";

export interface VenueDetailData {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  tags: string[];
  address: string;
  lat?: number;
  lng?: number;
  details: { icon: keyof typeof Ionicons.glyphMap; text: string }[];
}

export default function VenueDetailBlock({ venue }: { venue: VenueDetailData }) {
  return (
    <ScrollView className="flex-1 bg-surface" contentContainerStyle={{ paddingBottom: 32 }}>
      <Image source={venue.image} customClasses="w-full h-56" />

      <View className="p-4 gap-3">
        <View className="flex-row items-start justify-between">
          <Title text={venue.title} size="lg" className="flex-1 pr-3" />
          <ShareButton title={venue.title} url={`pubapp://venue/${venue.id}`} />
        </View>

        <View className="flex-row flex-wrap gap-1">
          {venue.tags.map((tag) => (
            <Pill key={tag} text={tag} />
          ))}
        </View>

        <Address text={venue.address} lat={venue.lat} lng={venue.lng} />

        <Paragraph text={venue.description} />

        <View className="gap-2 mt-2">
          {venue.details.map((detail) => (
            <VenueDetail key={detail.text} icon={detail.icon} text={detail.text} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
