import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
        headerShown: false,
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerShadowVisible: false,
        headerTitleStyle: { fontFamily: "Poppins_600SemiBold", color: "#0B2B1A" },
        tabBarActiveTintColor: "#007836",
        tabBarInactiveTintColor: "#8FA99A",
        tabBarStyle: { backgroundColor: "#FFFFFF", borderTopColor: "#BFEFD2" },
        tabBarLabelStyle: { fontFamily: "Poppins_500Medium", fontSize: 11 },
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
