import { useEffect } from "react";
import { View, Text } from "react-native";
import Svg, { Path, Line } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { COLORS } from "../constants/theme";

const GLASS_PATH = "M6 2 H30 L27.5 44 C27.5 48 25.5 50 18 50 C10.5 50 8.5 48 8.5 44 Z";

function Glass() {
  return (
    <Svg width={36} height={52} viewBox="0 0 36 52" fill="none">
      <Path
        d={GLASS_PATH}
        stroke={COLORS.surface}
        strokeWidth={2.5}
        strokeLinejoin="round"
        fill="rgba(255,255,255,0.12)"
      />
      <Line x1={9} y1={13} x2={27} y2={13} stroke={COLORS.surface} strokeWidth={1.5} opacity={0.5} />
    </Svg>
  );
}

interface LoadingScreenProps {
  label?: string;
}

/**
 * Two pint glasses rock toward each other, clink, and settle — on a loop.
 * Drop this in as the app's boot/splash-replacement screen, or reuse it
 * for any full-screen loading state (e.g. while fetching pubs nearby).
 */
export default function LoadingScreen({ label = "Finding pubs nearby..." }: LoadingScreenProps) {
  const left = useSharedValue(0);
  const right = useSharedValue(0);
  const clink = useSharedValue(0);

  useEffect(() => {
    const swing = () =>
      withRepeat(
        withSequence(
          withTiming(1, { duration: 620, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 520, easing: Easing.in(Easing.quad) }),
          withTiming(0, { duration: 560 })
        ),
        -1
      );

    left.value = swing();
    right.value = swing();
    clink.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 600 }),
        withTiming(1, { duration: 90 }),
        withTiming(0, { duration: 1010 })
      ),
      -1
    );
  }, []);

  const leftStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: left.value * 13 }, { rotate: `${left.value * -14}deg` }],
  }));

  const rightStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: right.value * -13 }, { rotate: `${right.value * 14}deg` }],
  }));

  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: clink.value,
    transform: [{ scale: 0.5 + clink.value }],
  }));

  return (
    <View className="flex-1 items-center justify-center bg-primary-dark">
      <View className="flex-row items-end">
        <Animated.View style={leftStyle}>
          <Glass />
        </Animated.View>
        <Animated.View style={[{ marginHorizontal: -6, marginBottom: 18 }, sparkleStyle]}>
          <Text style={{ fontSize: 20 }}>✨</Text>
        </Animated.View>
        <Animated.View style={rightStyle}>
          <Glass />
        </Animated.View>
      </View>
      <Text className="mt-6 font-poppins-medium text-surface text-base">{label}</Text>
    </View>
  );
}
