import { View } from "react-native";
import { router } from "expo-router";
import Input from "../base/Input";
import IconButton from "../base/IconButton";
import CurrentLocation from "../group/CurrentLocation";

interface HeaderProps {
  onSearchChange?: (text: string) => void;
  className?: string;
}

/**
 * Reusable in-content header: logo, current location, a link to Favourites,
 * and a search box. Not currently mounted by any route (the landing screen
 * and Results tab build their own top bars) — kept here for reuse if you
 * want this same row somewhere else.
 */
export default function Header({ onSearchChange, className = "" }: HeaderProps) {
  return (
    <View className={`bg-surface px-4 pt-3 pb-2 gap-3 ${className}`}>
      <View className="flex-row items-center justify-between">
        {/*<Logo />*/}
        <View className="flex-row items-center gap-4">
          <CurrentLocation />
          <IconButton image="heart-outline" onClick={() => router.push("/(tabs)/favourites")} />
        </View>
      </View>
      <Input showSearchIcon placeholder="Search pubs nearby..." onChangeText={onSearchChange} />
    </View>
  );
}
