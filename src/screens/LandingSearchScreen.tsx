import { useState } from "react";
import { View, ScrollView } from "react-native";
import { router } from "expo-router";
import * as Location from "expo-location";
import Button from "../components/base/Button";
import Link from "../components/base/Link";
import Title from "../components/base/Title";
import Paragraph from "../components/base/Paragraph";
import Checkbox from "../components/base/Checkbox";
import DistancePills from "../components/base/DistancePills";
import LocationSearchInput from "../components/group/LocationSearchInput";
import { FEATURE_OPTIONS, DISTANCE_OPTIONS, DEFAULT_DISTANCE_INDEX } from "@/constants/search";

export default function LandingSearchScreen() {
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);
  const [distanceIndex, setDistanceIndex] = useState(DEFAULT_DISTANCE_INDEX);
  const [locating, setLocating] = useState(false);

  const onChangeQuery = (text: string) => {
    setQuery(text);
    if (selectedLocation && text !== selectedLocation) {
      setSelectedLocation(null);
      setCoords(null);
    }
  };

  // Tapping a suggestion confirms the location but does NOT search.
  const onSelectLocation = (location: string) => {
    setQuery(location);
    setSelectedLocation(location);
    setCoords(null);
  };

  const toggleFeature = (id: string) => {
    setActiveFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  // Accepts the confirmed selection OR raw typed text, so the keyboard's
  // return key always does something.
  const runSearch = () => {
    const target = selectedLocation ?? query.trim();
    if (!target) return;
    router.push({
      pathname: "/(tabs)",
      params: {
        features: activeFeatures.join(","),
        radiusKm: String(DISTANCE_OPTIONS[distanceIndex].km),
        distanceIndex: String(distanceIndex),
        location: target,
        ...(coords ? { lat: String(coords.lat), lng: String(coords.lng) } : {}),
      },
    });
  };

  const useCurrentLocation = async () => {
    setLocating(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocating(false);
      return;
    }
    const position = await Location.getCurrentPositionAsync({});
    const [place] = await Location.reverseGeocodeAsync({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    const label = place?.city || place?.district || place?.postalCode || "Current location";

    setQuery(label);
    setSelectedLocation(label);
    setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
    setLocating(false);
  };

  const canSearch = Boolean(selectedLocation ?? query.trim());

  return (
    <ScrollView
      className="flex-1 bg-primary-dark"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24, gap: 24 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="items-center gap-2">
        <Title text="Find your local" size="xl" className="text-surface text-center" />
        <Paragraph
          text="Child friendly, dog friendly, sport-showing pubs near you."
          className="text-surface/80 text-center"
        />
      </View>

      <View className="gap-3 items-center">
        <LocationSearchInput
          variant="landing"
          value={query}
          onChangeText={onChangeQuery}
          onSelect={onSelectLocation}
          onSubmit={runSearch}
          selected={selectedLocation}
        />

        <Link
          text={locating ? "Finding you..." : "Use current location"}
          onClick={useCurrentLocation}
          className="text-surface"
        />
      </View>

      <View className="gap-2">
        <Paragraph text="What are you looking for?" className="text-surface font-poppins-medium" />
        <View className="bg-white/10 rounded-2xl p-3">
          {FEATURE_OPTIONS.map((f) => (
            <Checkbox
              key={f.id}
              label={f.text}
              icon={f.icon}
              checked={activeFeatures.includes(f.id)}
              onToggle={() => toggleFeature(f.id)}
            />
          ))}
        </View>
      </View>

      <View className="gap-2">
        <Paragraph text="Search distance" className="text-surface font-poppins-medium" />
        <DistancePills selectedIndex={distanceIndex} onSelect={setDistanceIndex} />
      </View>

      {/* Sits below every option so filters/distance are chosen first. */}
      {canSearch && <Button text="Search" onClick={runSearch} className="w-full mt-2" />}
    </ScrollView>
  );
}
