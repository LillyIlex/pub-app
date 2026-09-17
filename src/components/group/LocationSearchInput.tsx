import { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import Input from "../base/Input";
import Paragraph from "../base/Paragraph";
import { fetchLocationSuggestions } from "../../lib/geocoding";

interface LocationSearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  /**
   * Fired when a suggestion is tapped. Only CONFIRMS the location — it does
   * not run the search.
   */
  onSelect: (location: string) => void;
  /** Fired on keyboard return or the search-icon button. */
  onSubmit?: () => void;
  /** The currently confirmed selection, so we don't re-query for it. */
  selected?: string | null;
  placeholder?: string;
  /** "landing" = suggestions stack below. "compact" = suggestions float over content. */
  variant?: "landing" | "compact";
  className?: string;
}

export default function LocationSearchInput({
  value,
  onChangeText,
  onSelect,
  onSubmit,
  selected = null,
  placeholder = "Enter location",
  variant = "landing",
  className = "",
}: LocationSearchInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (value.length < 2 || value === selected) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      setSuggestions(await fetchLocationSuggestions(value));
    }, 300);
    return () => clearTimeout(timeout);
  }, [value, selected]);

  // Tapping a suggestion fills + confirms the field. Searching is separate.
  const pick = (location: string) => {
    setSuggestions([]);
    onSelect(location);
  };

  const handleSubmit = () => {
    setSuggestions([]);
    onSubmit?.();
  };

  return (
    <View className={`w-full ${variant === "landing" ? "gap-1" : ""} ${className}`}>
      <Input
        showSearchButton
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmit={handleSubmit}
      />

      {suggestions.length > 0 && (
        <View
          className={
            variant === "landing"
              ? "bg-white rounded-2xl overflow-hidden"
              : "absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-2xl overflow-hidden border border-border shadow"
          }
        >
          {suggestions.map((s) => (
            <Pressable
              key={s}
              onPress={() => pick(s)}
              className="px-4 py-3 border-b border-border active:bg-cream"
            >
              <Paragraph text={s} size="sm" />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
