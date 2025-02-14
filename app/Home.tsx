// Home.tsx
import React, { useEffect } from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, Stack } from "expo-router";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("./SignUp");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={["#22c55e", "#ffffff"]}
        style={{ flex: 0.7, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={require("../assets/images/trucking.png")}
          className="w-90 h-32"
          resizeMode="contain"
        />
        <Text className="text-green-600 text-lg font-bold mt-4">
          Appalachian test
        </Text>
        <Text className="text-green-600 text-lg font-bold">Trash-B-Gone</Text>
        <ActivityIndicator size="large" color="#22c55e" className="mt-9" />
      </LinearGradient>
    </View>
  );
}