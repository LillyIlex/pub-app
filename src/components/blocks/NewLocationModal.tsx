import { useState } from "react";
import { Modal, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../base/Title";
import Paragraph from "../base/Paragraph";
import Button from "../base/Button";
import LocationSearchInput from "../group/LocationSearchInput";
import { COLORS } from "@/constants/theme";

interface NewLocationModalProps {
  visible: boolean;
  currentLocation: string;
  onClose: () => void;
  /** Runs the search for the chosen location, in place. */
  onSearch: (location: string) => void;
}

/**
 * Two-step bottom sheet: confirms where you're currently searching, then lets
 * you type a new location and search it without leaving the screen.
 */
export default function NewLocationModal({
  visible,
  currentLocation,
  onClose,
  onSearch,
}: NewLocationModalProps) {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const close = () => {
    setSearching(false);
    setQuery("");
    setSelected(null);
    onClose();
  };

  const submit = () => {
    const target = selected ?? query.trim();
    if (!target) return;
    onSearch(target);
    close();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={close}>
      <View className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/40" onPress={close} />

        <View className="bg-white rounded-t-3xl p-6 pb-10 gap-4">
          <View className="items-center">
            <View className="w-10 h-1 rounded-full bg-border mb-3" />
          </View>

          <View className="flex-row items-start justify-between">
            <Title text={searching ? "Search a new location" : "Your location"} size="sm" className="flex-1 pr-3" />
            {/*<Pressable onPress={close} hitSlop={10}>*/}
            {/*  <Ionicons name="close" size={22} color={COLORS.ink} />*/}
            {/*</Pressable>*/}
          </View>

          {searching ? (
            <View className="gap-4">
              <LocationSearchInput
                variant="landing"
                value={query}
                onChangeText={(text) => {
                  setQuery(text);
                  if (selected && text !== selected) setSelected(null);
                }}
                onSelect={(location) => {
                  setQuery(location);
                  setSelected(location);
                }}
                onSubmit={submit}
                selected={selected}
                placeholder="Town or postcode"
              />
              <Button text="Search" onClick={submit} />
            </View>
          ) : (
            <View className="w-full gap-4">
              <Paragraph text={`Your location is currently ${currentLocation}.`} muted />
              <View className="flex flex-row gap-2">
                <Button className="w-1/2" text="Cancel" variant="secondary" onClick={close} />
                <Button className="w-1/2" text="Search new location" onClick={() => setSearching(true)} />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
