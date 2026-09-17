import { ScrollView, View, Pressable, Linking, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Image from "../base/Image";
import Title from "../base/Title";
import Paragraph from "../base/Paragraph";
import Address from "../base/Address";
import VenueDetail from "../base/VenueDetail";
import ShareButton from "../base/ShareButton";
import FeaturePill from "../base/FeaturePill";
import Button from "../base/Button";
import FavouriteToggle from "../group/FavouriteToggle";
import { FEATURE_OPTIONS } from "../../constants/search";
import { COLORS } from "../../constants/theme";
import { FeatureMap } from "../../data/mockVenues";

export interface VenueDetailData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: ImageSourcePropType;
  features: FeatureMap;
  address: string;
  lat?: number;
  lng?: number;
  phone?: string;
  website?: string;
  openingHours?: string;
  priceRange?: string;
  rating?: number;
  distance?: string;
  details: { icon: keyof typeof Ionicons.glyphMap; text: string }[];
}

export default function VenueDetailBlock({ venue }: { venue: VenueDetailData }) {
  return (
    <ScrollView className="flex-1 bg-surface" contentContainerStyle={{ paddingBottom: 56 }}>
      <Image source={venue.image} customClasses="w-full h-64" />

      <View className="px-5 pt-6 gap-y-7">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1 gap-y-1.5">
            <Title text={venue.title} size="lg" />
            {venue.subtitle ? <Paragraph text={venue.subtitle} muted /> : null}
            <View className="flex-row items-center gap-3 mt-1">
              {venue.rating ? (
                <View className="flex-row items-center gap-1">
                  <Ionicons name="star" size={14} color={COLORS.primaryDark} />
                  <Paragraph
                    text={venue.rating.toFixed(1)}
                    size="sm"
                    className="font-poppins-semibold text-primary-dark"
                  />
                </View>
              ) : null}
              {venue.priceRange ? <Paragraph text={venue.priceRange} size="sm" muted /> : null}
              {venue.distance ? <Paragraph text={venue.distance} size="sm" muted /> : null}
            </View>
          </View>

          <View className="flex-row items-center gap-3 pt-1">
            <FavouriteToggle
              venue={{
                id: venue.id,
                title: venue.title,
                subtitle: venue.subtitle,
                image: venue.image,
                features: venue.features,
                distance: venue.distance,
              }}
              size={24}
            />
            <ShareButton title={venue.title} url={`pubapp://venue/${venue.id}`} />
          </View>
        </View>

        <View className="gap-y-3">
          <Paragraph text="Facilities" className="font-poppins-semibold" />
          <View className="flex-row flex-wrap gap-2">
            {FEATURE_OPTIONS.map((f) => (
              <FeaturePill
                key={f.id}
                text={f.text}
                icon={f.icon}
                available={Boolean(venue.features[f.id])}
              />
            ))}
          </View>
        </View>

        <View className="gap-y-3">
          <Paragraph text="About" className="font-poppins-semibold" />
          <Paragraph text={venue.description} className="leading-5" />
        </View>

        <View className="gap-y-3">
          <Paragraph text="Good to know" className="font-poppins-semibold" />
          <View className="gap-y-3 bg-pillBg rounded-2xl p-4">
            {venue.openingHours ? (
              <VenueDetail icon="time-outline" text={venue.openingHours} />
            ) : null}
            {venue.details.map((detail) => (
              <VenueDetail key={detail.text} icon={detail.icon} text={detail.text} />
            ))}
          </View>
        </View>

        <View className="gap-y-3">
          <Paragraph text="Find it" className="font-poppins-semibold" />
          <Address text={venue.address} lat={venue.lat} lng={venue.lng} />
        </View>

        <View className="gap-y-3 mt-1">
          {venue.phone ? (
            <Button text="Call the pub" onClick={() => Linking.openURL(`tel:${venue.phone}`)} />
          ) : null}
          {venue.website ? (
            <Button
              text="Visit website"
              variant="secondary"
              onClick={() => venue.website && Linking.openURL(venue.website)}
            />
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}
