import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FilterButtonProps {
  open: boolean;
  onClick: () => void;
  className?: string;
}

export default function FilterButton({ open, onClick, className = "" }: FilterButtonProps) {
  return (
    <Pressable
      onPress={onClick}
      className={`flex-row items-center gap-1 rounded-full bg-white px-3 py-1.5 border-2 ${
       "border-primary-dark"
      } ${className}`}
    >
        <Ionicons name={!open ? "options-outline" : "close"} size={14} color={"#007836"} />
        <Text className={`font-poppins-medium text-xs ${ "text-primary-dark"}`}>
        Filters
      </Text>
    </Pressable>
  );
}
