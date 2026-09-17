// src/screens/FavouritesScreen.tsx
import { View } from "react-native";
import { router } from "expo-router";
import CardList from "../components/blocks/CardList";
import EmptyState from "../components/base/EmptyState";
import { useFavourites } from "@/context/FavouritesContext";

export default function FavouritesScreen() {
    const { favourites } = useFavourites();

    if (favourites.length === 0) {
        return (
            <EmptyState
                icon="heart-outline"
                title="No favourites yet"
                message="Tap the heart on any pub to save it here — favourites stay on this device for as long as you keep the app."
            />
        );
    }

    return (
        <View className="flex-1 bg-surface">
            <CardList data={favourites} layout="vertical" onSelect={(id) => router.push(`/venue/${id}`)} />
        </View>
    );
}