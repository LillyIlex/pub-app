// src/screens/MapScreen.tsx
import { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { router } from "expo-router";
import CardList from "../components/blocks/CardList";
import Paragraph from "../components/base/Paragraph";
import { MOCK_VENUES } from "@/data/mockVenues";
import { haversineKm } from "@/lib/geocoding";

const DEFAULT_REGION: Region = { latitude: 51.5072, longitude: -0.1276, latitudeDelta: 0.05, longitudeDelta: 0.05 };
const SEARCH_HERE_THRESHOLD_KM = 1;

export default function MapScreen() {
    const [region, setRegion] = useState<Region>(DEFAULT_REGION);
    const [locationReady, setLocationReady] = useState(false);
    const [lastSearchCenter, setLastSearchCenter] = useState<Region>(DEFAULT_REGION);
    const [showSearchHere, setShowSearchHere] = useState(false);
    const [venues, setVenues] = useState(MOCK_VENUES);

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
        })();
    }, []);

    const onRegionChangeComplete = (r: Region) => {
        setRegion(r);
        setShowSearchHere(haversineKm(lastSearchCenter, r) > SEARCH_HERE_THRESHOLD_KM);
    };

    const searchThisArea = () => {
        // TODO: replace with a real API call centred on `region`
        setLastSearchCenter(region);
        setShowSearchHere(false);
        setVenues(MOCK_VENUES);
    };

    return (
        <View className="flex-1 bg-surface">
            <MapView
                style={{ flex: 1 }}
                initialRegion={region}
                onRegionChangeComplete={onRegionChangeComplete}
                showsUserLocation={locationReady}
                showsMyLocationButton
            >
                {venues.map((v) => (
                    <Marker
                        key={v.id}
                        coordinate={{ latitude: v.lat, longitude: v.lng }}
                        title={v.title}
                        onCalloutPress={() => router.push(`/venue/${v.id}`)}
                    />
                ))}
            </MapView>

            {showSearchHere && (
                <View className="absolute top-4 left-0 right-0 items-center">
                    <Pressable onPress={searchThisArea} className="bg-primary-dark rounded-full px-4 py-2 shadow">
                        <Paragraph text="Search this area" className="text-surface font-poppins-semibold" />
                    </Pressable>
                </View>
            )}

            <View className="absolute bottom-4 left-0 right-0">
                <CardList data={venues} layout="horizontal" onSelect={(id) => router.push(`/venue/${id}`)} />
            </View>
        </View>
    );
}