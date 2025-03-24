import { Tabs, Stack, usePathname } from "expo-router";
import React from "react";
import "../global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Services/store";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const pathname = usePathname();
  const hiddenRoutes = [
    "/components/Users/SignUp",
    "/components/Users/SignIn",
    "/components/Users/SignedUp",
    "/Screens/Privacy",
    "/Screens/Terms",
    "/components/Feedback/ContactSeller",
    "/components/Feedback/TrackShipment",
    "/components/Payments/PayWithCard",
    "/Screens/Settings",
    "/Screens/Home",
  ];

  const shouldHideTabs = hiddenRoutes.some(route => pathname.startsWith(route));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#E3F8F3" }}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: shouldHideTabs
                ? { display: "none" } 
                : {
                    position: "absolute",
                    bottom: 0,
                    left: 16,
                    right: 16,
                    height: 55,
                    backgroundColor: "rgba(100, 202, 150, 0.95)",
                    borderRadius: 25,
                    paddingHorizontal: 12,
                    shadowColor: "#000",
                    shadowOpacity: 0.15,
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 12,
                    elevation: 6,
                  },
              tabBarItemStyle: {
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 45,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600",
                color: "white",
                marginBottom: 4,
              },
              tabBarIconStyle: {
                justifyContent: "center",
                alignItems: "center",
                marginTop: 4,
              },
            }}
          >
            {/* Home Tab */}
            <Tabs.Screen
              name="Screens/Welcome"
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialIcons
                    name="home"
                    size={24}
                    color={focused ? "white" : "rgba(255, 255, 255, 0.7)"}
                  />
                ),
                tabBarLabel: "Home",
              }}
            />

            {/* Products Tab */}
            <Tabs.Screen
              name="components/Products/Products"
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialIcons
                    name="local-mall"
                    size={24}
                    color={focused ? "white" : "rgba(255, 255, 255, 0.7)"}
                  />
                ),
                tabBarLabel: "Products",
              }}
            />

            {/* Account Tab */}
            <Tabs.Screen
              name="Screens/Account"
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialIcons
                    name="account-circle"
                    size={24}
                    color={focused ? "white" : "rgba(255, 255, 255, 0.7)"}
                  />
                ),
                tabBarLabel: "Account",
              }}
            />

            {/* Cart Tab */}
            <Tabs.Screen
              name="components/Cart/Cart"
              options={{
                tabBarIcon: ({ focused }) => (
                  <MaterialIcons
                    name="shopping-cart"
                    size={24}
                    color={focused ? "white" : "rgba(255, 255, 255, 0.7)"}
                  />
                ),
                tabBarLabel: "Cart",
              }}
            />
          </Tabs>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
