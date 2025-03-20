import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Client from "../Apis/client"; 

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await Client.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View className="flex-1 bg-[#E6F2ED]">
      <Stack.Screen options={{ headerShown: false }} />
      {/* Background Image */}
      <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
          <Image
              source={require('../../assets/images/dustbin.png')}
              className="w-90 h-90 opacity-100"
              resizeMode="contain"/>
      </View>
      {/* Top Section */}
      <View className="flex-row items-center justify-between px-4 py-4">
        {/* Back Button */}
        <TouchableOpacity 
          onPress={() => router.push('/Screens/Welcome')} 
          className="p-2 rounded-full bg-[#64CA96E5]"
        >
          <MaterialIcons name="arrow-left" size={20} color="white" /> 
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-lg font-semibold text-gray-700">
          All <Text className="text-green-600">Categories</Text>
        </Text>

        {/* Profile Image */}
        <Image
          source={require('../../assets/images/loginBear.png')} 
          className="w-10 h-10 rounded-full"
        />
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-6 mt-4">
        {/* Title */}
        <Text className="text-7xl font-bold text-gray-700">
          Choose Product {"\n"}With <Text className="text-green-600">Best Pricing.</Text>
        </Text>

        {/* Product Buttons */}
        <View className="mt-8 space-y-4">
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              className="bg-[#094b34] p-4 rounded-lg items-center border border-gray-500 mb-4"
              onPress={() => router.push(`/components/Products/Products?category=${category.id}`)}
            >
              <Text className="text-lg text-white font-semibold">{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View className="flex-row justify-around bg-[#64CA96E5] p-2 shadow">
        <TouchableOpacity onPress={() => router.push('/Screens/Welcome')} className="items-center">
          <MaterialIcons name="home" size={24} color="white" /> 
          <Text className="text-white text-xs">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/components/Products/Products')} className="items-center">
          <MaterialIcons name="local-mall" size={24} color="white" />
          <Text className="text-white text-xs">Products</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Screens/Account')} className="items-center">
          <MaterialIcons name="account-circle" size={24} color="white" /> 
          <Text className="text-white text-xs">Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/components/Cart/Cart')} className="items-center">
          <MaterialIcons name="shopping-cart" size={24} color="white" /> 
          <Text className="text-white text-xs">Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}