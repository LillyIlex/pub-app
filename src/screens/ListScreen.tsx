import { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Input from "../components/base/Input";
import IconButton from "../components/base/IconButton";
import FilterButton from "../components/base/FilterButton";
import EmptyState from "../components/base/EmptyState";
import CardSkeleton from "../components/base/CardSkeleton";
import Paragraph from "../components/base/Paragraph";
import CardList, { Venue } from "../components/blocks/CardList";
import LocationModal from "../components/blocks/LocationModal";
import { FEATURE_OPTIONS } from "@/constants/search";
import { MOCK_VENUES } from "@/data/mockVenues";
import FiltersList from "../components/blocks/FiltersList";

export default function ListScreen() {
  const params = useLocalSearchParams<{
    location?: string;
    lat?: string;
    lng?: string;
    features?: string;
    radiusKm?: string;
  }>();

  const hasSearch = Boolean(params.location || params.lat);

  const [query, setQuery] = useState(params.location ?? "");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState<string[]>(
    params.features ? params.features.split(",").filter(Boolean) : []
  );
  const [loading, setLoading] = useState(hasSearch);
  const [results, setResults] = useState<Venue[] | null>(hasSearch ? [] : null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

    const selectSuggestion = (s: string) => {
        setQuery(s);
        setSelectedLocation(s);
        setCoords(null); // a typed/picked place name — resolve to coords at search time
        setSuggestions([]);
    };

  useEffect(() => {
    if (!params.location && !params.lat) return;
    setLoading(true);
    // TODO: replace with a real API call using params.location / params.lat+lng /
    // activeFeatures / params.radiusKm
    const timeout = setTimeout(() => {
      setResults(MOCK_VENUES);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timeout);
  }, [params.location, params.lat, params.lng]);

  const toggleFeature = (id: string) => {
    setActiveFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const runSearch = () => {
    if (!query.trim()) return;
    router.setParams({ location: query.trim() });
    setQuery('')
  };

    // const runSearch = () => {
    //     if (!selectedLocation) return;
    //     goToResults(
    //         coords
    //             ? {location: selectedLocation, lat: String(coords.lat), lng: String(coords.lng)}
    //             : {location: selectedLocation}
    //     );
    // };
    //
    // / Prefills the input with the nearest place name and reveals the Search
    // // button — doesn't navigate, so filters/distance can still be picked first.
    // const useCurrentLocation = async () => {
    //     setLocating(true);
    //     const {status} = await Location.requestForegroundPermissionsAsync();
    //     if (status !== "granted") {
    //         setLocating(false);
    //         return;
    //     }
    //     const position = await Location.getCurrentPositionAsync({});
    //     const [place] = await Location.reverseGeocodeAsync({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //     });
    //     const label = place?.city || place?.district || place?.postalCode || "Current location";
    //
    //     setQuery(label);
    //     setSelectedLocation(label);
    //     setCoords({lat: position.coords.latitude, lng: position.coords.longitude});
    //     setSuggestions([]);
    //     setLocating(false);
    // };


    // The Results tab was opened without ever running a search this session.
  if (results === null) {
    return (
      <EmptyState
        icon="search-outline"
        title="No search yet"
        message="Start a new search to see pubs near you."
        actionText="New search"
        onAction={() => router.push("/")}
      />
    );
  }

  return (
    <View className="flex-1 bg-surface">
        <View className="flex-row items-center justify-between px-4 pt-3">
            <Pressable onPress={() => setLocationModalOpen(true)} className="flex-row items-center gap-1" hitSlop={8}>
                <Ionicons name="location-outline" size={14} color="#007836" />
                <Paragraph
                    text={params.location || "Current location"}
                    size="sm"
                    className="text-primary-dark font-poppins-medium"
                />
            </Pressable>

            <View className="flex-row items-center gap-3">
                {!loading && results.length > 0 && (
                    <Paragraph
                        text={`${results.length} ${results.length === 1 ? "result" : "results"}`}
                        size="md"
                        muted
                    />
                )}
                <IconButton image="heart-outline" onClick={() => router.push("/(tabs)/favourites")} />
            </View>
        </View>

      <View className="flex-row items-center px-4 pt-2 pb-2 mb-2 gap-2">
        <View className="flex-1">
          <Input
            showSearchIcon
            showGoButton
            placeholder="Enter location"
            value={query}
            onChangeText={setQuery}
            onSubmit={runSearch}
          />
        </View>
          {suggestions.length > 0 && (
              <View className="bg-white rounded-2xl overflow-hidden">
                  {suggestions.map((s) => (
                      <Pressable
                          key={s}
                          onPress={() => selectSuggestion(s)}
                          className="px-4 py-3 border-b border-border active:bg-cream"
                      >
                          <Paragraph text={s} size="sm"/>
                      </Pressable>
                  ))}
              </View>
          )}
        <FilterButton open={filtersOpen} onClick={() => setFiltersOpen((v) => !v)} />
      </View>

        <FiltersList
            filters={FEATURE_OPTIONS}
            activeIds={activeFeatures}
            onToggle={toggleFeature}
            onClearAll={() => setActiveFeatures([])}
            visible={filtersOpen}
        />

      {/*{filtersOpen && (*/}
      {/*  <ScrollView*/}
      {/*    horizontal*/}
      {/*    showsHorizontalScrollIndicator={false}*/}
      {/*    className="px-4 pb-2"*/}
      {/*    contentContainerStyle={{ alignItems: "center" }}*/}
      {/*  >*/}
      {/*    {FEATURE_OPTIONS.map((f) => (*/}
      {/*      <FilterOption*/}
      {/*        key={f.id}*/}
      {/*        text={f.text}*/}
      {/*        icon={f.icon}*/}
      {/*        active={activeFeatures.includes(f.id)}*/}
      {/*        onClick={() => toggleFeature(f.id)}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </ScrollView>*/}
      {/*)}*/}

      {loading ? (
        <View className="px-4 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </View>
      ) : results.length === 0 ? (
        <EmptyState
          icon="beer-outline"
          title="No pubs found"
          message={`No matches near "${query || "your location"}". Try a different search.`}
          actionText="New search"
          onAction={() => router.push("/")}
        />
      ) : (
        <CardList data={results} layout="vertical" onSelect={(id) => router.push(`/venue/${id}`)} />
      )}

      <LocationModal
        visible={locationModalOpen}
        location={params.location || "your current location"}
        onClose={() => setLocationModalOpen(false)}
      />
    </View>
  );
}
