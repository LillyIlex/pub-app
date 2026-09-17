import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/constants/theme";

const TABS: {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { name: "index", label: "Results", icon: "list" },
  { name: "map", label: "Map", icon: "map" },
  { name: "favourites", label: "Favourites", icon: "heart" },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // Each tab screen draws its own top bar (inside SafeAreaView), so the
        // native header stays off here.
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryDark,
        tabBarInactiveTintColor: COLORS.tabInactive,
        tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border },
        tabBarLabelStyle: { fontFamily: FONTS.medium, fontSize: 11 },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? tab.icon : (`${tab.icon}-outline` as keyof typeof Ionicons.glyphMap)}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
