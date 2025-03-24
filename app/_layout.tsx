import { Tabs, Stack, usePathname } from "expo-router";
import React from "react";
import "../global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Services/store";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export default function RootLayout() {
  const pathname = usePathname();

  // Pages where the bottom navigation should be hidden
  const hiddenRoutes = [
    "/Screens/Home", 
    "/components/Users/SignUp", 
    "/components/Users/SignIn", 
    "/components/Users/SignedUp", 
    "/Screens/Privacy", 
    "/Screens/Terms", 
    "/components/Feedback/ContactSeller",
    "/components/Feedback/TrackShipment", 
    "/components/Payment/PayWithCard",
    "/components/Screens/Settings"
  ];

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {hiddenRoutes.includes(pathname) ? (
          <Stack />
        ) : (
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#22c55e",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                backgroundColor: "#64CA96E5",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                paddingVertical: 10,
                height: 60,
                shadowOpacity: 0.3,
                shadowRadius: 4,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                borderTopWidth: 0,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                zIndex: 50,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                elevation: 5,
              },
              tabBarShowLabel: false,
            }}
          >
            {/* Home Tab */}
            <Tabs.Screen
              name="Screens/Welcome"
              options={{
                tabBarIcon: ({ color }) => (
                  <View style={{ alignItems: "center" }}>
                    <Ionicons name="home" size={24} color={color} />
                    <Text style={{ color: "white", fontSize: 10 }}>Home</Text>
                  </View>
                ),
              }}
            />

            {/* Products Tab */}
            <Tabs.Screen
              name="components/Products/Products"
              options={{
                tabBarIcon: ({ color }) => (
                  <View style={{ alignItems: "center" }}>
                    <Ionicons name="bag" size={24} color={color} />
                    <Text style={{ color: "white", fontSize: 10 }}>Products</Text>
                  </View>
                ),
              }}
            />

            {/* Account Tab */}
            <Tabs.Screen
              name="Screens/Account"
              options={{
                tabBarIcon: ({ color }) => (
                  <View style={{ alignItems: "center" }}>
                    <Ionicons name="person-circle" size={24} color={color} />
                    <Text style={{ color: "white", fontSize: 10 }}>Account</Text>
                  </View>
                ),
              }}
            />

            {/* Cart Tab */}
            <Tabs.Screen
              name="components/Cart/Cart"
              options={{
                tabBarIcon: ({ color }) => (
                  <View style={{ alignItems: "center" }}>
                    <Ionicons name="cart" size={24} color={color} />
                    <Text style={{ color: "white", fontSize: 10 }}>Cart</Text>
                  </View>
                ),
              }}
            />
          </Tabs>
        )}
      </PersistGate>
    </Provider>
  );
}