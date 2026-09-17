import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

interface LoadingSpinnerProps extends ActivityIndicatorProps {
  className?: string;
}

export default function LoadingSpinner({
  color = "#007836",
  size = "small",
  ...rest
}: LoadingSpinnerProps) {
  return <ActivityIndicator color={color} size={size} {...rest} />;
}
