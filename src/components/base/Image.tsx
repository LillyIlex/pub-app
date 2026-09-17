import { Image as RNImage, ImageProps, Pressable } from "react-native";

interface AppImageProps extends ImageProps {
  clickable?: boolean;
  onClick?: () => void;
  customClasses?: string;
}

export default function Image({ clickable = false, onClick, customClasses = "", ...rest }: AppImageProps) {
  const image = <RNImage className={customClasses} resizeMode="cover" {...rest} />;

  if (!clickable) return image;

  return (
    <Pressable onPress={onClick} className="active:opacity-80">
      {image}
    </Pressable>
  );
}
