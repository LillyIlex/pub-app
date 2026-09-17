import { Link } from "expo-router";
import { View } from "react-native";
import Title from "../components/base/Title";
import Paragraph from "../components/base/Paragraph";

export default function NotFound() {
  return (
    <View className="flex-1 items-center justify-center bg-surface px-8 gap-2">
      <Title text="Page not found" size="md" />
      <Paragraph text="That screen doesn't exist." muted />
      <Link href="/" className="mt-3 font-poppins-medium text-link underline">
        Go to search
      </Link>
    </View>
  );
}
