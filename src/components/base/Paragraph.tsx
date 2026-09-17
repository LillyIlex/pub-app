import { Text, TextProps } from "react-native";

type Size = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<Size, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

interface ParagraphProps extends TextProps {
  text: string;
  size?: Size;
  muted?: boolean;
  className?: string;
}

export default function Paragraph({
  text,
  size = "md",
  muted = false,
  className = "",
  ...rest
}: ParagraphProps) {
  return (
    <Text
      className={`font-poppins ${SIZE_CLASSES[size]} ${muted ? "text-muted" : "text-ink"} ${className}`}
      {...rest}
    >
      {text}
    </Text>
  );
}
