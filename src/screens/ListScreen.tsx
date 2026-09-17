import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import EmptyState from "../components/base/EmptyState";
import CardSkeleton from "../components/base/CardSkeleton";
import FilterButton from "../components/base/FilterButton";
import CardList, { Venue } from "../components/blocks/CardList";
import ActiveFiltersBar from "../components/blocks/ActiveFiltersBar";
import FiltersDrawer from "../components/blocks/FiltersDrawer";
import NewLocationModal from "../components/blocks/NewLocationModal";
import ScreenHeader from "../components/blocks/ScreenHeader";
import LocationSearchInput from "../components/group/LocationSearchInput";
import { DEFAULT_DISTANCE_INDEX, sortByFilterMatch } from "@/constants/search";
import { MOCK_VENUES } from "@/data/mockVenues";

export default function ListScreen() {
  const params = useLocalSearchParams<{
    location?: string;
    lat?: string;
    lng?: string;
    features?: string;
    radiusKm?: string;
    distanceIndex?: string;
  }>();

  const hasSearch = Boolean(params.location || params.lat);

  const [query, setQuery] = useState("");
  const [pendingLocation, setPendingLocation] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState<string[]>(
    params.features ? params.features.split(",").filter(Boolean) : []
  );
  const [distanceIndex, setDistanceIndex] = useState(
    params.distanceIndex ? Number(params.distanceIndex) : DEFAULT_DISTANCE_INDEX
  );
  const [loading, setLoading] = useState(hasSearch);
  const [results, setResults] = useState<Venue[] | null>(hasSearch ? [] : null);

  useEffect(() => {
    if (!params.location && !params.lat) return;
    setLoading(true);
    setQuery("");
    setPendingLocation(null);
    // TODO: replace with a real API call using params.location / params.lat+lng /
    // activeFeatures / params.radiusKm
    const timeout = setTimeout(() => {
      setResults(MOCK_VENUES);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timeout);
  }, [params.location, params.lat, params.lng]);

  // Best feature matches first; distance order preserved within ties.
  const sortedResults = useMemo(
    () => (results ? sortByFilterMatch(results, activeFeatures) : null),
    [results, activeFeatures]
  );

  const toggleFeature = (id: string) => {
    setActiveFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const searchLocation = (location: string) => {
    router.setParams({ location });
  };

  const runSearch = () => {
    const target = pendingLocation ?? query.trim();
    if (!target) return;
    searchLocation(target);
  };

  if (sortedResults === null) {
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
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface">
      <ScreenHeader
        location={params.location || "Current location"}
        onLocationPress={() => setLocationModalOpen(true)}
        resultCount={loading ? null : sortedResults.length}
      />

      <View className="flex-row items-start px-4 pt-2 pb-2 gap-2 z-50">
        <View className="flex-1">
          <LocationSearchInput
            variant="compact"
            value={query}
            onChangeText={setQuery}
            onSelect={(location) => {
              setQuery(location);
              setPendingLocation(location);
            }}
            onSubmit={runSearch}
            selected={pendingLocation}
            placeholder="Search a new location"
          />
        </View>
        <FilterButton open={drawerOpen} onClick={() => setDrawerOpen(true)} />
      </View>

      <ActiveFiltersBar
        activeIds={activeFeatures}
        distanceIndex={distanceIndex}
        onRemove={toggleFeature}
        onClearAll={() => setActiveFeatures([])}
      />

      {loading ? (
        <View className="px-4 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </View>
      ) : sortedResults.length === 0 ? (
        <EmptyState
          icon="beer-outline"
          title="No pubs found"
          message={`No matches near ${params.location || "your location"}. Try a different search.`}
          actionText="New search"
          onAction={() => router.push("/")}
        />
      ) : (
        <CardList data={sortedResults} layout="vertical" onSelect={(id) => router.push(`/venue/${id}`)} />
      )}

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
        currentLocation={params.location || "your current location"}
        onClose={() => setLocationModalOpen(false)}
        onSearch={searchLocation}
      />
    </SafeAreaView>
  );
}
