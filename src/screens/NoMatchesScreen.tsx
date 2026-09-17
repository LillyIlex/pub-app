import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../components/base/Title";
import Paragraph from "../components/base/Paragraph";
import Button from "../components/base/Button";

interface NoMatchesScreenProps {
  onSearchAgain: () => void;
}

export default function NoMatchesScreen({ onSearchAgain }: NoMatchesScreenProps) {
  return (
    <View className="flex-1 items-center justify-center bg-white px-8 gap-3">
      <Ionicons name="search-outline" size={40} color="#0B2B1A" />
      <Title text="No pubs found" size="md" />
      <Paragraph text="Try adjusting your filters or searching a different area." muted className="text-center" />
      <Button text="Search again" onClick={onSearchAgain} className="mt-2" />
    </View>
  );
}
