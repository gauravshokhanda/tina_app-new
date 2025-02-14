
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function TrackShipment() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#E6F2ED]">
        <Stack.Screen options={{ headerShown: false }} />

        {/* Header */}
        <View className="flex-row items-center justify-between px-4 mt-6">
            <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
            <MaterialIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-700">
            Track <Text className="text-green-600">Shipment</Text>
            </Text>
            <View className="w-8" /> 
        </View>

        {/* Content */}
        <ScrollView className="px-4 mt-4 mb-20">
            {/* Shipment Status */}
            <View className="bg-white p-4 rounded-lg shadow mb-4">
            <View className="flex-row items-center mb-2">
                <Ionicons name="location-outline" size={24} color="#64CA96E5" />
                <Text className="text-lg font-bold text-gray-800 ml-2">Shipment Status</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-600">Order ID</Text>
                <Text className="text-gray-800">#123456</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-600">Current Status</Text>
                <Text className="text-green-600 font-bold">In Transit</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-600">Estimated Delivery</Text>
                <Text className="text-gray-800">2023-10-15</Text>
            </View>
            </View>

            {/* Tracking Timeline */}
            <View className="bg-white p-4 rounded-lg shadow mb-4">
            <View className="flex-row items-center mb-2">
                <MaterialIcons name="timeline" size={24} color="#64CA96E5" />
                <Text className="text-lg font-bold text-gray-800 ml-2">Tracking Timeline</Text>
            </View>
            <View className="space-y-4">
                <View className="flex-row items-center">
                <View className="w-6 h-6 bg-green-600 rounded-full items-center justify-center">
                    <MaterialIcons name="check" size={16} color="white" />
                </View>
                <Text className="text-gray-800 ml-2">Order Placed</Text>
                <Text className="text-gray-600 ml-auto">2023-10-01</Text>
                </View>
                <View className="flex-row items-center">
                <View className="w-6 h-6 bg-green-600 rounded-full items-center justify-center">
                    <MaterialIcons name="check" size={16} color="white" />
                </View>
                <Text className="text-gray-800 ml-2">Shipped</Text>
                <Text className="text-gray-600 ml-auto">2023-10-05</Text>
                </View>
                <View className="flex-row items-center">
                <View className="w-6 h-6 bg-gray-300 rounded-full items-center justify-center">
                    <MaterialIcons name="location-on" size={16} color="white" />
                </View>
                <Text className="text-gray-800 ml-2">Out for Delivery</Text>
                <Text className="text-gray-600 ml-auto">2023-10-14</Text>
                </View>
                <View className="flex-row items-center">
                <View className="w-6 h-6 bg-gray-300 rounded-full items-center justify-center">
                    <MaterialIcons name="home" size={16} color="white" />
                </View>
                <Text className="text-gray-800 ml-2">Delivered</Text>
                <Text className="text-gray-600 ml-auto">2023-10-15</Text>
                </View>
            </View>
            </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View className="flex-row justify-around bg-[#64CA96E5] p-2 shadow">
            <TouchableOpacity onPress={() => router.push('/Welcome')} className="items-center">
            <MaterialIcons name="home" size={24} color="white" />
            <Text className="text-white text-xs">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/Products')} className="items-center">
            <MaterialIcons name="local-mall" size={24} color="white" />
            <Text className="text-white text-xs">Products</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/Account')} className="items-center">
            <MaterialIcons name="account-circle" size={24} color="white" />
            <Text className="text-white text-xs">Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/Cart')} className="items-center">
            <MaterialIcons name="shopping-cart" size={24} color="white" />
            <Text className="text-white text-xs">Cart</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    }