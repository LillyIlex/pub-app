import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Venue } from "@/components/blocks/CardList";

const STORAGE_KEY = "pubapp:favourites";

interface FavouritesContextValue {
  favourites: Venue[];
  isFavourited: (id: string) => boolean;
  addFavourite: (venue: Venue) => void;
  removeFavourite: (id: string) => void;
}

const FavouritesContext = createContext<FavouritesContextValue | undefined>(undefined);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<Venue[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setFavourites(JSON.parse(raw));
      } catch {
        // ignore corrupt storage, start empty
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return; // don't clobber storage before the initial read finishes
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favourites)).catch(() => {});
  }, [favourites, loaded]);

  const isFavourited = (id: string) => favourites.some((f) => f.id === id);

  const addFavourite = (venue: Venue) => {
    setFavourites((prev) => (prev.some((f) => f.id === venue.id) ? prev : [...prev, venue]));
  };

  const removeFavourite = (id: string) => {
    setFavourites((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, isFavourited, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used within a FavouritesProvider");
  return ctx;
}
