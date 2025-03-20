import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUserState, clearUserState } from "../components/Users/userReducer";
import { RootState } from "../Services/store";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

const LoggedOutAccount = () => {
    const router = useRouter();
    return (
        <View className="flex-1 bg-[#E6F2ED] justify-center items-center px-4">
            <Stack.Screen options={{ headerShown: false }} />
        <Animated.View entering={FadeIn.duration(600)} className="items-center">
            <Image
            source={require("../../assets/images/loginBear.png")}
            className="w-15 h-15 rounded-full mb-4"
            />
            <Text className="text-2xl font-bold text-gray-800 text-center">
            Welcome to Your Account
            </Text>
            <Text className="text-gray-600 text-center mt-2">
            Log in to access your orders, transactions, and settings.
            </Text>
            <TouchableOpacity
            onPress={() => router.push('/components/Users/SignIn')}
            className="bg-[#64CA96E5] py-3 px-6 rounded-lg flex-row items-center justify-center mt-8 shadow-md"
            >
            <MaterialIcons name="exit-to-app" size={22} color="white" />
            <Text className="text-white font-semibold ml-2 text-lg">Log In</Text>
            </TouchableOpacity>
        </Animated.View>
        </View>
    );
    };

    const LoggedInAccount = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { name } = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        dispatch(clearUserState());
        router.push("/components/Users/SignIn");
    };

    return (
        <View className="flex-1 bg-[#E6F2ED] px-4 pb-20">
        <Stack.Screen options={{ headerShown: false }} />

        {/* Header */}
        <Animated.View
            entering={FadeInUp.duration(500)}
            className="flex-row items-center justify-between mt-6"
        >
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
        <Animated.View
            entering={FadeInUp.duration(500).delay(100)}
            className="items-center mt-6"
        >
            <Image
            source={require("../../assets/images/loginBear.png")}
            className="w-24 h-24 rounded-full border-4 border-[#64CA96E5]"
            />
            <Text className="text-2xl font-bold mt-4 text-gray-800">{name}</Text>
            <Text className="text-gray-600">Member since Jan-2024</Text>
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

        {/* Bottom Navigation */}
        <View className="absolute bottom-0 left-0 right-0 bg-[#64CA96E5] p-2 shadow flex-row justify-around z-50">
            <TouchableOpacity
            onPress={() => router.push("/Screens/Welcome")}
            className="items-center"
            >
            <MaterialIcons name="home" size={24} color="white" />
            <Text className="text-white text-xs">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => router.push("/components/Products/Products")}
            className="items-center"
            >
            <MaterialIcons name="local-mall" size={24} color="white" />
            <Text className="text-white text-xs">Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => router.push("/Screens/Account")}
            className="items-center"
            >
            <MaterialIcons name="account-circle" size={24} color="white" />
            <Text className="text-white text-xs">Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => router.push("/components/Cart/Cart")}
            className="items-center"
            >
            <MaterialIcons name="shopping-cart" size={24} color="white" />
            <Text className="text-white text-xs">Cart</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    };

    export default function Account() {
    const { isLoggedIn } = useSelector((state: RootState) => state.user);
    return isLoggedIn ? <LoggedInAccount /> : <LoggedOutAccount />;
    }