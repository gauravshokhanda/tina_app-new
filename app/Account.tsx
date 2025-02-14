import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./userReducer";
import { RootState } from "./store";

const LoggedOutAccount = () => {
const router = useRouter();
return (
    <View className="flex-1 bg-[#E6F2ED] justify-center items-center">
    <Text className="text-2xl font-semibold text-gray-700">Please log in to view your account</Text>
    <TouchableOpacity
        onPress={() => router.push("/SignIn")}
        className="bg-black py-3 px-6 rounded-lg flex-row items-center justify-center mt-8"
    >
        <MaterialIcons name="exit-to-app" size={22} color="white" />
        <Text className="text-white font-semibold ml-2 text-lg">Log In</Text>
    </TouchableOpacity>
    </View>
);
};

const LoggedInAccount = () => {
const router = useRouter();
const dispatch = useDispatch();
const { name } = useSelector((state: RootState) => state.user);

const handleLogout = () => {
    dispatch(clearUser());
    router.push("/SignIn");
};

return (
    <View className="flex-1 bg-[#E6F2ED] px-4 pb-20">
    <Stack.Screen options={{ headerShown: false }} />

    {/* Header */}
    <View className="flex-row items-center justify-between mt-6">
        <TouchableOpacity onPress={() => router.push("/Products")} className="p-2 rounded-full bg-[#64CA96E5]">
        <MaterialIcons name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-gray-700">
        My <Text className="text-green-600">Account</Text>
        </Text>
        <View className="w-10" /> {/* Spacer */}
    </View>

    {/* Profile Section */}
    <View className="items-center mt-6">
        <Image source={require("../assets/images/loginBear.png")} className="w-16 h-16 rounded-full" />
        <Text className="text-2xl font-bold mt-3">{name}</Text>
        <Text className="text-gray-600">Member since Jan-2024</Text>
    </View>

    {/* Menu Sections */}
    <ScrollView className="mt-8 space-y-4">
        {/* Manage Section */}
        <Text className="text-gray-700 font-bold mt-5">Manage</Text>
        <View className="bg-white rounded-lg p-4 space-y-2 shadow-md mt-4">
        <TouchableOpacity onPress={() => router.push("/MyOrders")} className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
            <MaterialIcons name="receipt-long" size={18} color="gray" />
            <Text className="ml-3 text-gray-800">My Orders</Text>
            </View>
            <MaterialIcons name="chevron-right" size={18} color="gray" />
        </TouchableOpacity>
        <View className="border-b border-gray-300 my-1 mb-3" />
        <TouchableOpacity onPress={() => router.push("/Transactions")} className="flex-row justify-between items-center">
            <View className="flex-row items-center">
            <MaterialIcons name="credit-card" size={18} color="gray" />
            <Text className="ml-3 text-gray-800">My Transactions</Text>
            </View>
            <MaterialIcons name="chevron-right" size={18} color="gray" />
        </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <Text className="text-gray-700 font-semibold mt-7 mb-4">Settings</Text>
        <View className="bg-white rounded-lg p-4 space-y-2 shadow-md">
        <TouchableOpacity onPress={() => router.push("/Settings")} className="flex-row justify-between items-center">
            <View className="flex-row items-center mb-2">
            <MaterialIcons name="settings" size={18} color="gray" />
            <Text className="ml-3 text-gray-800">Account Settings</Text>
            </View>
            <MaterialIcons name="chevron-right" size={18} color="gray" />
        </TouchableOpacity>
        <View className="border-b border-gray-300 my-1 mb-2" />
        <TouchableOpacity onPress={() => router.push("/Feedback")} className="flex-row justify-between items-center mt-2">
            <View className="flex-row items-center">
            <MaterialIcons name="rate-review" size={18} color="gray" />
            <Text className="ml-3 text-gray-800">Feedback</Text>
            </View>
            <MaterialIcons name="chevron-right" size={18} color="gray" />
        </TouchableOpacity>
        </View>

        {/* Others Section */}
        <Text className="text-gray-700 font-semibold mt-7 mb-4">Others</Text>
        <View className="bg-white rounded-lg p-4 space-y-2 shadow-md">
        <TouchableOpacity onPress={() => router.push("/AboutUs")} className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
            <MaterialIcons name="info" size={18} color="gray" />
            <Text className="ml-3 text-gray-800">About Us</Text>
            </View>
            <MaterialIcons name="chevron-right" size={18} color="gray" />
        </TouchableOpacity>
        <View className="border-b border-gray-300 my-1 mb-2" />
        <TouchableOpacity onPress={() => router.push("/Help")} className="flex-row justify-between items-center">
            <View className="flex-row items-center">
            <MaterialIcons name="live-help" size={18} color="gray" />
            <Text className="ml-3 text-gray-800">FAQ</Text>
            </View>
            <MaterialIcons name="chevron-right" size={18} color="gray" />
        </TouchableOpacity>
        </View>
    </ScrollView>

    {/* Logout Button */}
    <TouchableOpacity
        onPress={handleLogout}
        className="bg-black py-3 px-6 rounded-lg flex-row items-center justify-center mt-8 mx-4"
    >
        <MaterialIcons name="exit-to-app" size={22} color="white" />
        <Text className="text-white font-semibold ml-2 text-lg">Log Out</Text>
    </TouchableOpacity>

    {/* Bottom Navigation */}
    <View className="absolute bottom-0 left-0 right-0 bg-[#64CA96E5] p-2 shadow flex-row justify-around z-50">
        <TouchableOpacity onPress={() => router.push("/Welcome")} className="items-center">
        <MaterialIcons name="home" size={24} color="white" />
        <Text className="text-white text-xs">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Products")} className="items-center">
        <MaterialIcons name="local-mall" size={24} color="white" />
        <Text className="text-white text-xs">Products</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Account")} className="items-center">
        <MaterialIcons name="account-circle" size={24} color="white" />
        <Text className="text-white text-xs">Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Cart")} className="items-center">
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
