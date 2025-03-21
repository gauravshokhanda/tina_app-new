import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../Services/store";
import { setUser } from "./userReducer";
import type { AppDispatch } from "../../Services/store";
import Client from "../../Apis/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  Easing 
} from "react-native-reanimated";

function SignupScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation values
  const titleOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.8);
  const imageTranslateY = useSharedValue(-50);

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
    // Animation sequence
    titleOpacity.value = withTiming(1, { 
      duration: 1000, 
      easing: Easing.ease 
    });
    buttonScale.value = withSpring(1, { damping: 10 });
    imageTranslateY.value = withSpring(0, { damping: 15 });
  }, []);

  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: imageTranslateY.value }],
  }));

  const handleSignIn = async () => {
    router.push("./SignIn");
  };

  const handleSignUp = async () => {
    router.push("./SignedUp");
  };

  return (
    <View className="flex-1 bg-white px-6">
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 bg-white">
        <View className="bg-green-500 h-3/5 w-full rounded-b-[60px] items-center justify-center relative mt-5">
          <Animated.View style={animatedImageStyle}>
            <Image
              source={require("../../../assets/images/loginBear.png")}
              className="w-70 h-70 mt-3"
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View style={animatedTitleStyle}>
            <Text className="text-white text-2xl font-extrabold tracking-wide shadow-md">
              Appalachian
            </Text>
            <Text className="text-white text-2xl font-extrabold tracking-wide shadow-md">
              Trash-B-Gone
            </Text>
          </Animated.View>
        </View>

        <View className="flex-1 w-full px-6 mt-10">
          <Animated.View style={animatedButtonStyle}>
            <TouchableOpacity 
              onPress={handleSignIn} 
              className="bg-green-900 p-4 rounded-full items-center shadow-lg"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-semibold tracking-wide">
                Sign In
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={animatedButtonStyle}>
            <TouchableOpacity 
              onPress={handleSignUp} 
              className="border border-green-500 p-4 rounded-full items-center mt-4 shadow-lg"
              activeOpacity={0.8}
            >
              <Text className="text-green-500 text-lg font-semibold tracking-wide">
                Sign Up
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

export default function SignUp() {
  return (
    <Provider store={store}>
      <SignupScreen />
    </Provider>
  );
}