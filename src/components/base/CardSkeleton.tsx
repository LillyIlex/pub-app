import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

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
      style={style}
      className="flex-row h-32 bg-white rounded-2xl border border-border overflow-hidden mb-3"
    >
      <View className="w-1/2 h-full bg-border" />
      <View className="flex-1 p-3 gap-2">
        <View className="h-4 w-3/4 bg-border rounded" />
        <View className="h-3 w-1/2 bg-border rounded" />
        <View className="flex-row gap-1 mt-2">
          <View className="h-5 w-16 bg-border rounded-full" />
          <View className="h-5 w-16 bg-border rounded-full" />
        </View>
      </View>
    </Animated.View>
  );
}
