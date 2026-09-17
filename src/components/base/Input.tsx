import { TextInput, TextInputProps, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  showSearchIcon?: boolean;
  showGoButton?: boolean;
  onSubmit?: () => void;
  className?: string;
}

export default function Input({
  showSearchIcon = false,
  showGoButton = false,
  onSubmit,
  onSubmitEditing,
  className = "",
  ...rest
}: InputProps) {
  return (
    <View
      className={`flex-row items-center bg-white border border-border rounded-full pl-4 pr-1.5 py-1.5 ${className}`}
    >
      {showSearchIcon && <Ionicons name="search" size={16} color="#6B8F7C" style={{ marginRight: 6 }} />}
        <TextInput
            placeholderTextColor="#6B8F7C"
            className="flex-1 font-poppins text-sm text-ink"
            returnKeyType="search"
            autoCorrect={false}
            autoComplete="off"
            spellCheck={false}
            onSubmitEditing={(e) => {
                onSubmitEditing?.(e);
                onSubmit?.();
            }}
            {...rest}
        />
      {showGoButton && (
        <Pressable
          onPress={onSubmit}
          hitSlop={8}
          className="w-8 h-8 rounded-full bg-primary items-center justify-center active:opacity-80"
        >
          <Ionicons name="arrow-forward" size={16} color="#0B2B1A" />
        </Pressable>
      )}
    </View>
  );
}
