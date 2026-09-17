import { Text, TextProps } from "react-native";

type Size = "sm" | "md" | "lg" | "xl";

const SIZE_CLASSES: Record<Size, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

interface TitleProps extends TextProps {
  text: string;
  size?: Size;
  className?: string;
}

export default function Title({ text, size = "md", className = "", ...rest }: TitleProps) {
  return (
    <Text className={`font-poppins-bold text-ink ${SIZE_CLASSES[size]} ${className}`} {...rest}>
      {text}
    </Text>
  );
}
