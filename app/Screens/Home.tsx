import React, { useEffect, useRef } from "react";
import { View, Image, Text, ActivityIndicator, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const router = useRouter();

  const animation = useRef(new Animated.Value(0)).current;



  useEffect(() => {
    checkUserLogin();
}, []);

const checkUserLogin = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
        router.push("/Screens/Welcome");
    }
};

  useEffect(() => {
    // Start animation
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true, 
    }).start();

    // Navigate after 2 seconds
    const timer = setTimeout(() => {
      router.push("/components/Users/SignUp");
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  
  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={["#22c55e", "#a7f3d0", "#ffffff", "#ffffff"]} //gradient color
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Animated.View
          style={{
            opacity,
            transform: [{ scale }, { translateY }],
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/HomeScreen.png")}
            className="w-48 h-48" 
            resizeMode="contain"
            style={{ 
              shadowColor: "#000", 
              shadowOffset: { width: 0, height: 4 }, 
              shadowOpacity: 0.3, 
              shadowRadius: 5,
            }}
          />
          <Text 
            className="text-green-600 text-4xl font-bold mt-6" 
            style={{ 
              textShadowColor: "rgba(0, 0, 0, 0.2)", 
              textShadowOffset: { width: 1, height: 1 }, 
              textShadowRadius: 2,
            }}
          >
            Appalachian
          </Text>
          <Text 
            className="text-green-600 text-4xl font-bold mb-8" 
            style={{ 
              textShadowColor: "rgba(0, 0, 0, 0.2)", 
              textShadowOffset: { width: 1, height: 1 }, 
              textShadowRadius: 2,
            }}
          >
            Trash-B-Gone
          </Text>
          <ActivityIndicator 
            size="large" 
            color="#22c55e" 
            style={{ transform: [{ scale: 1.5 }], marginTop: 40 }} // loading circle
          />
        </Animated.View>
      </LinearGradient>
    </View>
  );
}