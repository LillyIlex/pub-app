import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { CARD } from "../../constants/theme";

export default function CardSkeleton() {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(1, { duration: 600 }), withTiming(0.4, { duration: 600 })),
      -1
    );
  }, []);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[style, { height: CARD.listHeight }]}
      className="flex-row bg-white rounded-2xl border border-border overflow-hidden mb-3"
    >
      <View style={{ width: CARD.imageWidth }} className="h-full bg-border" />
      <View className="flex-1 p-3 gap-2">
        <View className="h-4 w-3/4 bg-border rounded" />
        <View className="h-3 w-1/2 bg-border rounded" />
        <View className="flex-row flex-wrap gap-1 mt-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} className="h-5 w-14 bg-border rounded-full" />
          ))}
        </View>
      </View>
    </Animated.View>
  );
}
