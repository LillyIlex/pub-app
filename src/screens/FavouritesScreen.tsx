import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CardList from "../components/blocks/CardList";
import EmptyState from "../components/base/EmptyState";
import ScreenHeader from "../components/blocks/ScreenHeader";
import { useFavourites } from "@/context/FavouritesContext";

export default function FavouritesScreen() {
  const { favourites } = useFavourites();

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface">
      <ScreenHeader
        location="Your favourites"
        locationIcon="heart"
        resultCount={favourites.length}
        showFavourites={false}
      />

      {favourites.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="No favourites yet"
          message="Tap the heart on any pub to save it here — favourites stay on this device for as long as you keep the app."
          actionText="Find pubs"
          onAction={() => router.push("/")}
        />
      ) : (
        <CardList
          data={favourites}
          layout="vertical"
          // Removing here makes the card vanish, so ask first.
          confirmRemove
          onSelect={(id) => router.push(`/venue/${id}`)}
        />
      )}
    </SafeAreaView>
  );
}
