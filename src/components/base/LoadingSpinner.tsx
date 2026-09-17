import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { COLORS } from "@/constants/theme";

export default function LoadingSpinner({
  color = COLORS.primaryDark,
  size = "small",
  ...rest
}: ActivityIndicatorProps) {
  return <ActivityIndicator color={color} size={size} {...rest} />;
}
