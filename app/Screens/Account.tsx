import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUserState, clearUserState } from "../components/Users/userReducer";
import { RootState } from "../Services/store";
import Animated, { FadeInUp } from "react-native-reanimated";
import Client from "../Apis/client"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoggedInAccount = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { name, user_email, token } = useSelector((state: RootState) => state.user); 
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({ name: name || "User", email: user_email || "" });

    // Fetch user data from API 
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const storedUser = await AsyncStorage.getItem("user"); 
            const parsedUser = storedUser ? JSON.parse(storedUser) : {};
            const authToken = parsedUser.token || token; // Use token

            if (!authToken) {
                throw new Error("No token found");
            }

            // API call to fetch user data r
            const user = await Client.getUser(authToken);

            
            setUserData({
                name: user.name || "User", 
                email: user.email || "",
            });

            
            dispatch(
                setUserState({
                    ...user,
                    token: authToken,
                    name: user.name,
                    user_email: user.email,
                    isLoggedIn: true,
                })
            );
            //Alert.alert("Success", "User data loaded successfully.");
        } catch (error) {
            Alert.alert("Error", "Failed to fetch user data. Redirecting to login...");
            router.push("/components/Users/SignIn"); 
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await dispatch(clearUserState());
            await AsyncStorage.removeItem("user");
            Alert.alert("Logged Out", "You have been logged out successfully.");
            router.replace("/components/Users/SignIn");
        } catch (error) {
            Alert.alert("Error", "Logout failed. Please try again.");
        }
    };

    return (
        <View className="flex-1 bg-[#E6F2ED] px-4 pb-20">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <Animated.View entering={FadeInUp.duration(500)} className="flex-row items-center justify-between mt-6">
                <TouchableOpacity
                    onPress={() => router.push("/components/Products/Products")}
                    className="p-2 rounded-full bg-[#64CA96E5] shadow-md"
                >
                    <MaterialIcons name="arrow-left" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-gray-800">
                    My <Text className="text-green-600">Account</Text>
                </Text>
                <TouchableOpacity>
                    <MaterialIcons name="person" size={25} color="#64CA96E5" />
                </TouchableOpacity>
            </Animated.View>

            {/* Profile Section */}
            <Animated.View entering={FadeInUp.duration(500).delay(100)} className="items-center mt-6">
                <Image
                    source={require("../../assets/images/loginBear.png")}
                    className="w-24 h-24 rounded-full border-4 border-[#64CA96E5]"
                />
                <Text className="text-2xl font-bold mt-4 text-gray-800">
                    {loading ? "Loading..." : userData.name}
                </Text>
                <Text className="text-gray-600">{loading ? "Fetching..." : userData.email }</Text>
            </Animated.View>

            {/* Menu Sections */}
            <ScrollView className="mt-6 space-y-4">
                {/* Manage Section */}
                <Animated.View entering={FadeInUp.duration(500).delay(200)}>
                    <Text className="text-gray-700 font-bold text-lg">Manage</Text>
                    <View className="bg-white rounded-lg p-4 space-y-2 shadow-md mt-2">
                        <TouchableOpacity
                            onPress={() => router.push("/components/Orders/MyOrders")}
                            className="flex-row justify-between items-center py-2"
                        >
                            <View className="flex-row items-center">
                                <MaterialIcons name="receipt-long" size={22} color="#64CA96E5" />
                                <Text className="ml-3 text-gray-800 text-lg">My Orders</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={22} color="gray" />
                        </TouchableOpacity>
                        <View className="border-b border-gray-200 my-1" />
                        <TouchableOpacity
                            onPress={() => router.push("/constants/Transactions")}
                            className="flex-row justify-between items-center py-2"
                        >
                            <View className="flex-row items-center">
                                <MaterialIcons name="credit-card" size={22} color="#64CA96E5" />
                                <Text className="ml-3 text-gray-800 text-lg">My Transactions</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={22} color="gray" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Settings Section */}
                <Animated.View entering={FadeInUp.duration(500).delay(300)}>
                    <Text className="text-gray-700 font-bold text-lg mt-4">Settings</Text>
                    <View className="bg-white rounded-lg p-4 space-y-2 shadow-md mt-2">
                        <TouchableOpacity
                            onPress={() => router.push("/Screens/Settings")}
                            className="flex-row justify-between items-center py-2"
                        >
                            <View className="flex-row items-center">
                                <MaterialIcons name="settings" size={22} color="#64CA96E5" />
                                <Text className="ml-3 text-gray-800 text-lg">Account Settings</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={22} color="gray" />
                        </TouchableOpacity>
                        <View className="border-b border-gray-200 my-1" />
                        <TouchableOpacity
                            onPress={() => router.push("/components/Feedback/Feedback")}
                            className="flex-row justify-between items-center py-2"
                        >
                            <View className="flex-row items-center">
                                <MaterialIcons name="rate-review" size={22} color="#64CA96E5" />
                                <Text className="ml-3 text-gray-800 text-lg">Feedback</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={22} color="gray" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Others Section */}
                <Animated.View entering={FadeInUp.duration(500).delay(400)}>
                    <Text className="text-gray-700 font-bold text-lg mt-4">Others</Text>
                    <View className="bg-white rounded-lg p-4 space-y-2 shadow-md mt-2">
                        <TouchableOpacity
                            onPress={() => router.push("/Screens/AboutUs")}
                            className="flex-row justify-between items-center py-2"
                        >
                            <View className="flex-row items-center">
                                <MaterialIcons name="info" size={22} color="#64CA96E5" />
                                <Text className="ml-3 text-gray-800 text-lg">About Us</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={22} color="gray" />
                        </TouchableOpacity>
                        <View className="border-b border-gray-200 my-1" />
                        <TouchableOpacity
                            onPress={() => router.push("/components/Feedback/Help")}
                            className="flex-row justify-between items-center py-2"
                        >
                            <View className="flex-row items-center">
                                <MaterialIcons name="live-help" size={22} color="#64CA96E5" />
                                <Text className="ml-3 text-gray-800 text-lg">FAQ</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={22} color="gray" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>

            {/* Logout Button */}
            <Animated.View entering={FadeInUp.duration(500).delay(500)}>
                <TouchableOpacity
                    onPress={handleLogout}
                    className="bg-[#64CA96E5] py-3 px-6 rounded-lg flex-row items-center justify-center mt-8 mx-4 shadow-md"
                >
                    <MaterialIcons name="exit-to-app" size={22} color="white" />
                    <Text className="text-white font-semibold ml-2 text-lg">Log Out</Text>
                </TouchableOpacity>
            </Animated.View>

            
        </View>
    );
};

export default LoggedInAccount;