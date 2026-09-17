import { TextInput, TextInputProps, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

interface InputProps extends TextInputProps {
  /** Renders the search icon on the right as the submit button. */
  showSearchButton?: boolean;
  onSubmit?: () => void;
  className?: string;
}

export default function Input({
  showSearchButton = false,
  onSubmit,
  onSubmitEditing,
  className = "",
  ...rest
}: InputProps) {
  return (
    <View
      className={`flex-row items-center bg-white border border-border rounded-full pl-4 pr-2 py-2 ${className}`}
    >
      <TextInput
        placeholderTextColor={COLORS.muted}
        className="flex-1 font-poppins text-sm text-ink"
        returnKeyType="search"
        // Our own suggestion list is the only autocomplete UI we want.
        autoCorrect={false}
        autoComplete="off"
        autoCapitalize="words"
        spellCheck={false}
        // Fires on the keyboard's return/search key.
        onSubmitEditing={(e) => {
          onSubmitEditing?.(e);
          onSubmit?.();
        }}
        {...rest}
      />
      {showSearchButton && (
        <Pressable
          onPress={onSubmit}
          hitSlop={8}
          className="w-9 h-9 rounded-full items-center justify-center active:opacity-60"
        >
          <Ionicons name="search" size={20} color={COLORS.primaryDark} />
        </Pressable>
      )}
    </View>
  );
}
