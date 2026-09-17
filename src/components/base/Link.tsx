import { Pressable, Text } from "react-native";

interface LinkProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function Link({ text, onClick, className = "" }: LinkProps) {
  return (
    <Pressable onPress={onClick} hitSlop={8} className="active:opacity-70">
      <Text className={`font-poppins-medium text-link underline ${className}`}>{text}</Text>
    </Pressable>
  );
}
