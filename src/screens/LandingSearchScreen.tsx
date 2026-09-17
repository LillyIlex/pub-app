// src/screens/LandingSearchScreen.tsx
import {useEffect, useState} from "react";
import {View, ScrollView, Pressable} from "react-native";
import {router} from "expo-router";
import * as Location from "expo-location";
import {Ionicons} from "@expo/vector-icons";
import Input from "../components/base/Input";
import Button from "../components/base/Button";
import Link from "../components/base/Link";
import Title from "../components/base/Title";
import Paragraph from "../components/base/Paragraph";
import {FEATURE_OPTIONS, DISTANCE_OPTIONS} from "@/constants/search";
import {fetchLocationSuggestions} from "@/lib/geocoding";

export default function LandingSearchScreen() {
    const [query, setQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [activeFeatures, setActiveFeatures] = useState<string[]>([]);
    const [distanceIndex, setDistanceIndex] = useState(0);
    const [locating, setLocating] = useState(false);

    useEffect(() => {
        if (query.length < 2 || query === selectedLocation) {
            setSuggestions([]);
            return;
        }
        const timeout = setTimeout(async () => {
            const results = await fetchLocationSuggestions(query);
            setSuggestions(results);
        }, 300);
        return () => clearTimeout(timeout);
    }, [query, selectedLocation]);

    const onChangeQuery = (text: string) => {
        setQuery(text);
        if (selectedLocation && text !== selectedLocation) {
            setSelectedLocation(null);
            setCoords(null); // typing invalidates the coords from "use current location" too
        }
    };

    const selectSuggestion = (s: string) => {
        setQuery(s);
        setSelectedLocation(s);
        setCoords(null); // a typed/picked place name — resolve to coords at search time
        setSuggestions([]);
    };

    const toggleFeature = (id: string) => {
        setActiveFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
    };

    const goToResults = (params: Record<string, string>) => {
        router.push({
            pathname: "/(tabs)",
            params: {
                features: activeFeatures.join(","),
                radiusKm: String(DISTANCE_OPTIONS[distanceIndex].km),
                ...params,
            },
        });
    };

    const runSearch = () => {
        if (!selectedLocation) return;
        goToResults(
            coords
                ? {location: selectedLocation, lat: String(coords.lat), lng: String(coords.lng)}
                : {location: selectedLocation}
        );
    };

    // Prefills the input with the nearest place name and reveals the Search
    // button — doesn't navigate, so filters/distance can still be picked first.
    const useCurrentLocation = async () => {
        setLocating(true);
        const {status} = await Location.requestForegroundPermissionsAsync();
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
        setCoords({lat: position.coords.latitude, lng: position.coords.longitude});
        setSuggestions([]);
        setLocating(false);
    };

    return (
        <ScrollView
            className="flex-1 bg-primary-dark"
            contentContainerStyle={{flexGrow: 1, justifyContent: "center", padding: 24, gap: 24}}
            keyboardShouldPersistTaps="handled"
        >
            <View className="items-center gap-2">
                <Title text="Find your local" size="xl" className="text-surface text-center"/>
                <Paragraph
                    text="Child friendly, dog friendly, sport-showing pubs near you."
                    className="text-surface/80 text-center"
                />
            </View>

            <View className="gap-3 items-center">
                <View className="w-full gap-1">
                    <Input
                        showSearchIcon
                        placeholder="Enter location"
                        value={query}
                        onChangeText={onChangeQuery}
                        onSubmit={() => suggestions[0] && selectSuggestion(suggestions[0])}
                        className="bg-white"
                    />
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
                </View>

                <Link
                    text={locating ? "Finding you..." : "Use current location"}
                    onClick={useCurrentLocation}
                    className="text-surface"
                />
            </View>

            <View className="gap-2">
                <Paragraph text="What are you looking for?" className="text-surface font-poppins-medium"/>
                <View className="gap-2 bg-white/10 rounded-2xl p-3">
                    {FEATURE_OPTIONS.map((f) => {
                        const active = activeFeatures.includes(f.id);
                        return (
                            <Pressable key={f.id} onPress={() => toggleFeature(f.id)}
                                       className="flex-row items-center gap-3 py-1">
                                <Ionicons name={active ? "checkbox" : "square-outline"} size={20} color="#FFFFFF"/>
                                <Ionicons name={f.icon} size={16} color="#FFFFFF"/>
                                <Paragraph text={f.text} className="text-surface"/>
                            </Pressable>
                        );
                    })}
                </View>
            </View>

            <View className="gap-2">
                <Paragraph text="Search distance" className="text-surface font-poppins-medium"/>
                <View className="flex-row gap-2">
                    {DISTANCE_OPTIONS.map((d, i) => (
                        <Pressable
                            key={d.label}
                            onPress={() => setDistanceIndex(i)}
                            className={`flex-1 items-center py-2 rounded-full border-2 ${
                                distanceIndex === i ? "bg-white border-white" : "border-white/40"
                            }`}
                        >
                            <Paragraph
                                text={d.label}
                                className={distanceIndex === i ? "text-primary-dark font-poppins-semibold" : "text-surface"}
                            />
                        </Pressable>
                    ))}
                </View>
                <View className="gap-2 mt-6">
                    {selectedLocation && <Button text="Search" onClick={runSearch} className="w-full"/>}
                </View>

            </View>
        </ScrollView>
    );
}