import { Tabs, usePathname } from "expo-router";
import React, { useState, useEffect } from "react";
import "../global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Services/store";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const pathname = usePathname();
  const [isWelcomeLoading, setIsWelcomeLoading] = useState(true);

  useEffect(() => {
    if (pathname === "/Screens/Welcome") {
      setIsWelcomeLoading(true);
      setTimeout(() => {
        setIsWelcomeLoading(false);
      }, 2000);
    } else {
      setIsWelcomeLoading(false);
    }
  }, [pathname]);
  
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

  const shouldHideTabs = isWelcomeLoading || hiddenRoutes.some(route => pathname === route);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#E3F8F3" }}>
          {isWelcomeLoading && pathname === "/Screens/Welcome" ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#64CA96" />
            </View>
          ) : (
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
                      height: 50,
                      backgroundColor: "rgba(100, 202, 150, 0.95)",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
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
          )}
          <Toast />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}