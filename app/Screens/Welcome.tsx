import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; 

export default function Welcome() {
    const router = useRouter();

    type Category = {
        id: number;
        name: string;
        icon: keyof typeof MaterialIcons.glyphMap; 
    };
    const categories = [
        { id: 1, name: "One Time Pick-Ups", icon: "local-shipping" },
        { id: 2, name: "Weekly Removal", icon: "autorenew" },
        { id: 3, name: "Service - Recurring", icon: "repeat" },
    ];

    const products = [
        { id: 1, name: "6-15 Bags\n13 gallon", image: require("../../assets/images/Bags_13_Gallon_6_15.jpg") },
        { id: 2, name: "18-24 Bags\n13 gallon", image: require("../../assets/images/Bags_13_Gallon_18_24.jpg") },
        { id: 3, name: "16-20 Bags\n13 gallon", image: require("../../assets/images/Small_Home_To_Medium.jpg") },
    ];

    return (
        <View className="flex-1 bg-[#d8f4ed]">
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView className="flex-1 p-5">
                {/* Welcome Section */}
                <View className="flex-row justify-between items-center mb-5">
                    <View>
                        <Text className="mt-4 text-4xl font-bold pt-6">Hello! Tom,</Text>
                        <Text className="ml-6 text-4xl font-bold">Welcome! To</Text>
                        <Text className="text-4xl font-bold text-[#045B51EE] pt-3 left-[94]">Appalachian{"\n"}Trash-B-Gone</Text>
                    </View>
                    <Image source={require("../../assets/images/loginBear.png")} className="w-16 h-16 rounded-full bottom-[30]" />
                </View>

                {/* Categories Section */}
                <View className="mb-3">
                    <Text className="text-lg font-bold mb-2 pb-2 mt-4">Categories</Text>
                    <View className="flex-row justify-between gap-3 mb-1">
                        {categories.map((category) => (
                            <TouchableOpacity key={category.id} className="bg-white p-4 rounded-lg flex-1 items-center gap-1">
                                <MaterialIcons name={category.icon as keyof typeof MaterialIcons.glyphMap} size={44} color="green" />
                                <Text className="text-center text-lg font-bold">{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => router.push("/constants/Categories")} className="bg-[#045B51EE] p-2 rounded-lg self-end mt-3">
                        <Text className="text-white">See all →</Text>
                    </TouchableOpacity>
                </View>

                {/* Products Section */}
                <View className="mb-5">
                    <Text className="text-lg font-bold mb-2 pb-2">Products</Text>
                    <View className="flex-row justify-between gap-3 mb-1">
                        {products.map((product) => (
                            <TouchableOpacity key={product.id} className="bg-white p-4 rounded-lg flex-1 items-center">
                                <Image source={product.image} className="w-20 h-20" resizeMode="contain" />
                                <Text className="text-center text-lg font-bold">{product.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => router.push("/components/Products/Products")} className="bg-[#045B51EE] p-2 rounded-lg self-end mt-3">
                        <Text className="text-white">See all →</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Navigation Bar */}
            <View className="flex-row justify-around bg-[#64CA96E5] p-2 shadow">
                <TouchableOpacity onPress={() => router.push("/Screens/Welcome")} className="items-center">
                    <MaterialIcons name="home" size={24} color="white" />
                    <Text className="text-white text-xs">Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/components/Products/Products")} className="items-center">
                    <MaterialIcons name="local-mall" size={24} color="white" />
                    <Text className="text-white text-xs">Products</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/Screens/Account")} className="items-center">
                    <MaterialIcons name="account-circle" size={24} color="white" />
                    <Text className="text-white text-xs">Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/components/Cart/Cart")} className="items-center">
                    <MaterialIcons name="shopping-cart" size={24} color="white" />
                    <Text className="text-white text-xs">Cart</Text>
                </TouchableOpacity>
            </View>

            
        </View>
    );
}