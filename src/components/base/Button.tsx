import { Pressable, Text, PressableProps } from "react-native";

type Variant = "primary" | "secondary";

interface ButtonProps extends Omit<PressableProps, "onPress"> {
  text: string;
  variant?: Variant;
  onClick?: () => void;
  className?: string;
}

const VARIANT_BG: Record<Variant, string> = {
  primary: "bg-primary",
  secondary: "bg-white border-2 border-primary-dark",
};

const VARIANT_TEXT: Record<Variant, string> = {
  primary: "text-ink",
  secondary: "text-primary-dark",
};

export default function Button({
  text,
  variant = "primary",
  onClick,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      onPress={onClick}
      // Even padding all round; min-height keeps both variants consistent.
      className={`rounded-2xl px-5 py-3 min-h-[48px] items-center justify-center active:opacity-80 ${VARIANT_BG[variant]} ${className}`}
      {...rest}
    >
      <Text
        className={`font-poppins-semibold text-sm ${VARIANT_TEXT[variant]}`}
        style={{ includeFontPadding: false }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
