import React, { useState, useEffect } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, Alert,KeyboardAvoidingView,ScrollView,Platform } from "react-native";
import { useRouter, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setUser } from "./userReducer";
import type { AppDispatch } from "../../Services/store";
import Client from "../../Apis/client";

export default function SignIn() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkUserLogin();
    }, []);
    
    const checkUserLogin = async () => {
        const storedUser = await AsyncStorage.getItem("user");
        const fromLogout = await AsyncStorage.getItem("fromLogout");
        
        if (storedUser && !fromLogout) {
            router.push("/Screens/Welcome");
        }
    };

    
    const handleSignIn = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Please enter both username and password.");
            return;
        }

        setIsLoading(false);

        try {
            const response = await Client.login({ username, password });

            if (response.status === 200) {
                const userData = response.data;
                await AsyncStorage.setItem("user", JSON.stringify(userData));
                dispatch(setUser(userData));
                router.push("/Screens/Welcome");
            } else {
                Alert.alert("Error", response.data.message || "Sign-in failed. Please try again.");
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            className="flex-1 bg-white"
        >
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }} 
                keyboardShouldPersistTaps="handled"
            >
        <View className="flex-1 px-6">
            <Stack.Screen options={{ headerShown: false }} />

            <TouchableOpacity
                onPress={() => router.push('./SignUp')}
                className="w-10 h-10 rounded-full bg-[#64CA96E5] flex items-center justify-center mt-6"
            >
                <MaterialIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>

            <View className="flex-1 justify-center gap-8">
                <View className="items-center">
                    <Image source={require("../../../assets/images/loginBear.png")} className="w-60 h-60" resizeMode="contain" />
                </View>

                <Text className="text-center text-green-500 text-xl font-bold px-6">
                    Just one Step To Clean..
                </Text>

                <TextInput
                    className="bg-gray-100 p-6 rounded-lg"
                    placeholder="Username" 
                    value={username} 
                    onChangeText={setUsername}  
                    autoCapitalize="none"
                    placeholderTextColor={"gray"}
                />
                <TextInput
                    className="bg-gray-100 p-6 rounded-lg"
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={"gray"}
                />

                <TouchableOpacity
                    onPress={handleSignIn}
                    className="bg-green-900 p-4 rounded-full items-center"
                    disabled={isLoading}
                >
                    <Text className="text-white text-lg font-semibold">
                        {isLoading ? "Signing In..." : "Sign In"}
                    </Text>
                </TouchableOpacity>

                <View>
                    <Text className="text-center text-gray-400 mb-3">Forgot your password?</Text>
                    <Text className="text-center text-gray-500 mb-2">
                        Don't have an account yet?{" "}
                        <Text onPress={() => router.push('./SignedUp')} className="text-green-500 font-bold">
                            Sign Up
                        </Text>
                    </Text>

                    <Text className="text-center text-gray-500">
                        <Text className="text-sm text-center">By logging in or registering, you agree to our</Text>{" "}
                        <Text onPress={() => router.push('/Screens/Terms')} className="text-green-500 font-bold text-sm">
                            Terms of Service
                        </Text>{" "}
                        and{" "}
                        <Text onPress={() => router.push('/Screens/Privacy')} className="text-green-500 font-bold text-sm">
                            Privacy Policy
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}