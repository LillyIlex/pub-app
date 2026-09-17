import { useEffect, useMemo, useRef, useState } from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CardList from "../components/blocks/CardList";
import ScreenHeader from "../components/blocks/ScreenHeader";
import ActiveFiltersBar from "../components/blocks/ActiveFiltersBar";
import FiltersDrawer from "../components/blocks/FiltersDrawer";
import FilterButton from "../components/base/FilterButton";
import NewLocationModal from "../components/blocks/NewLocationModal";
import Paragraph from "../components/base/Paragraph";
import { MOCK_VENUES } from "@/data/mockVenues";
import { haversineKm } from "@/lib/geocoding";
import { COLORS } from "@/constants/theme";
import { DEFAULT_DISTANCE_INDEX, sortByFilterMatch } from "@/constants/search";

const DEFAULT_REGION: Region = {
  latitude: 51.5072,
  longitude: -0.1276,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};
const SEARCH_HERE_THRESHOLD_KM = 1;

export default function MapScreen() {
  const params = useLocalSearchParams<{
    location?: string;
    features?: string;
    distanceIndex?: string;
  }>();

  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);
  const [lastSearchCenter, setLastSearchCenter] = useState<Region>(DEFAULT_REGION);
  const [showSearchHere, setShowSearchHere] = useState(false);
  const [locationReady, setLocationReady] = useState(false);
  const [venues, setVenues] = useState(MOCK_VENUES);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState<string[]>(
    params.features ? params.features.split(",").filter(Boolean) : []
  );
  const [distanceIndex, setDistanceIndex] = useState(
    params.distanceIndex ? Number(params.distanceIndex) : DEFAULT_DISTANCE_INDEX
  );
  // Reflects the area currently being searched, updated on "Search this area".
  const [areaLabel, setAreaLabel] = useState(params.location || "Current location");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const position = await Location.getCurrentPositionAsync({});
      const here: Region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setRegion(here);
      setLastSearchCenter(here);
      setLocationReady(true);
      mapRef.current?.animateToRegion(here, 500);
    })();
  }, []);

  const onRegionChangeComplete = (r: Region) => {
    setRegion(r);
    setShowSearchHere(haversineKm(lastSearchCenter, r) > SEARCH_HERE_THRESHOLD_KM);
  };

  const searchThisArea = async () => {
    // TODO: replace with a real API call centred on `region`
    setLastSearchCenter(region);
    setShowSearchHere(false);
    setVenues(MOCK_VENUES);

    // Keep the header label in step with the area actually being searched.
    try {
      const [place] = await Location.reverseGeocodeAsync({
        latitude: region.latitude,
        longitude: region.longitude,
      });
      setAreaLabel(place?.city || place?.district || place?.postalCode || "Map area");
    } catch {
      setAreaLabel("Map area");
    }
  };

  const sortedVenues = useMemo(
    () => sortByFilterMatch(venues, activeFeatures),
    [venues, activeFeatures]
  );

  const toggleFeature = (id: string) => {
    setActiveFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface">
      <ScreenHeader
        location={areaLabel}
        onLocationPress={() => setLocationModalOpen(true)}
        resultCount={sortedVenues.length}
      />
      <View className="flex-1 mt-1">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={DEFAULT_REGION}
          onRegionChangeComplete={onRegionChangeComplete}
          showsUserLocation={locationReady}
          showsMyLocationButton
        >
          {/*
            PINS: one <Marker> per venue. `coordinate` positions it; everything
            else is presentation. Custom pin? pass `image={require(...)}` or nest
            JSX inside <Marker>...</Marker>.
          */}
          {sortedVenues.map((venue) => (
            <Marker
              key={venue.id}
              identifier={venue.id}
              coordinate={{ latitude: venue.lat, longitude: venue.lng }}
              title={venue.title}
              description={venue.subtitle}
              pinColor={COLORS.primaryDark}
              onCalloutPress={() => router.push(`/venue/${venue.id}`)}
            />
          ))}
        </MapView>

        {showSearchHere && (
          <View className="absolute top-4 left-0 right-0 items-center">
            <Pressable
              onPress={searchThisArea}
              className="flex-row items-center gap-1.5 bg-primary-dark rounded-full px-5 py-3 shadow-lg"
            >
              <Ionicons name="refresh" size={14} color={COLORS.surface} />
              <Paragraph text="Search this area" className="text-surface font-poppins-semibold" />
            </Pressable>
          </View>
        )}

        <View className="absolute bottom-4 left-0 right-0">
          <CardList data={sortedVenues} layout="horizontal" onSelect={(id) => router.push(`/venue/${id}`)} />
        </View>
      </View>

      <FiltersDrawer
        visible={drawerOpen}
        activeIds={activeFeatures}
        distanceIndex={distanceIndex}
        onToggle={toggleFeature}
        onDistanceChange={setDistanceIndex}
        onClearAll={() => setActiveFeatures([])}
        onApply={() => setDrawerOpen(false)}
        onClose={() => setDrawerOpen(false)}
      />

      <NewLocationModal
        visible={locationModalOpen}
        currentLocation={areaLabel}
        onClose={() => setLocationModalOpen(false)}
        onSearch={(location) => {
          setAreaLabel(location);
          // TODO: geocode `location` and re-centre the map on it, then refetch.
          setVenues(MOCK_VENUES);
        }}
      />
    </SafeAreaView>
  );
}
