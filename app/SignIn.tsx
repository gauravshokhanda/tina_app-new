import React, { useState, useEffect } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setUser } from "./userReducer";
import type { AppDispatch } from "./store";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // State for email & password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    checkUserLogin(); 
  }, []);

  const checkUserLogin = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      router.push("/Welcome");
    }
  };

  // Password validation function
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    // Simulate a successful login
    const user = {
      name: "Manish Sirohi",
      email: "manishsirohi023@gmail.com",
      phoneNumber: "1234567890",
      address: "123 Main St",
      isLoggedIn: true, 
    };
    
    dispatch(setUser(user)); 
    router.push("/Welcome");
  };

  

  return (
    <View className="flex-1 bg-white px-6">
      <Stack.Screen options={{ headerShown: false }} />
      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => router.push('/SignUp')} 
        className="w-10 h-10 rounded-full bg-[#64CA96E5] flex items-center justify-center mt-6">
        <MaterialIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      {/* Main Content with Gap */}
      <View className="flex-1 justify-center gap-8">
        {/* Image */}
        <View className="items-center">
          <Image
            source={require("../assets/images/loginBear.png")}
            className="w-60 h-60"
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text className="text-center text-green-500 text-xl font-bold px-6">
          Just one Step To Clean..
        </Text>

        {/* Input Fields */}
        <TextInput
          className="bg-gray-100 p-6 rounded-lg"
          placeholder="Email address"
          value={email}
          onChangeText={setEmail} // Capture email input
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="bg-gray-100 p-6 rounded-lg"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword} // Capture password input
        />

        {/* Sign In Button */}
        <TouchableOpacity onPress={handleSignIn} className="bg-green-900 p-4 rounded-full items-center">
          <Text className="text-white text-lg font-semibold">Sign In</Text>
        </TouchableOpacity>

        <View>
          {/* Forgot Password & Sign Up */}
          <Text className="text-center text-gray-400 mb-3">Forgot your password?</Text>
          <Text className="text-center text-gray-500 mb-2">
            Don't have an account yet?{" "}
            <Text onPress={() => router.push('/SignedUp')} className="text-green-500 font-bold">Sign Up</Text>
          </Text>

          {/* Terms & Privacy */}
          <Text className="text-center text-gray-500">
            <Text className="text-sm text-center">By logging in or registering, you agree to our</Text>{" "}
            <Text onPress={() => router.push('/Terms')} className="text-green-500 font-bold text-sm">Terms of Service</Text> and{" "}
            <Text onPress={() => router.push('/Privacy')} className="text-green-500 font-bold text-sm">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
