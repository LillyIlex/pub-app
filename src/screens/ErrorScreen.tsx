import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../components/base/Title";
import Paragraph from "../components/base/Paragraph";
import Button from "../components/base/Button";

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorScreen({ message = "Something went wrong.", onRetry }: ErrorScreenProps) {
  return (
    <View className="flex-1 items-center justify-center bg-surface px-8 gap-3">
      <Ionicons name="beer-outline" size={40} color="#007836" />
      <Title text="Oops!" size="md" />
      <Paragraph text={message} muted className="text-center" />
      {onRetry && <Button text="Try again" onClick={onRetry} className="mt-2" />}
    </View>
  );
}
