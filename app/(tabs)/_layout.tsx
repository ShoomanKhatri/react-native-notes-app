import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "green", // Active tab color
        tabBarInactiveTintColor: "gray", // Inactive tab color
        tabBarStyle: {
          backgroundColor: "white",
          paddingBottom: 5,
          borderTopWidth: 0,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        }, // Tab bar style
        headerStyle: {
          backgroundColor: "green",
          borderBottomWidth: 0,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
        headerTintColor: "white", // Change text color in navbar
        headerTitleStyle: { fontWeight: "bold", fontSize: 18 }, // Change title style
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Notes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Add Note Tab */}
      <Tabs.Screen
        name="add-note"
        options={{
          title: "Add Note",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
