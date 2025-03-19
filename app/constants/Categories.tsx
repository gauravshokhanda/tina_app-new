import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Client from '../Apis/client'; 

interface Product {
  id: number;
  name: string;
  categories: Category[];
}

interface Category {
  id: number;
  name: string;
  slug?: string;
  description?: string;
}

export default function Categories() {
  const router = useRouter();
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await Client.fetchProducts();
        console.log("Received products:", response.data); // Debug log
  
        // Extract unique categories from products
        const categories: Category[] = [];
        response.data.forEach((product: Product) => {
          product.categories.forEach((category: Category) => {
            if (!categories.find(c => c.id === category.id)) {
              categories.push(category);
            }
          });
        });
  
        setCategoriesList(categories);
        setLoading(false);
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || "Failed to load categories";
        console.error("Detailed Error:", err.response?.data);
        setError(errorMessage);
        setLoading(false);
      }
    };
  
    getCategories();
  }, []);

  return (
    <View className="flex-1 bg-[#E6F2ED]">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
        <Image
          source={require('../../assets/images/dustbin.png')}
          className="w-90 h-90 opacity-100"
          resizeMode="contain"
        />
      </View>
      
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity 
          onPress={() => router.push('/Screens/Welcome')} 
          className="p-2 rounded-full bg-[#64CA96E5]"
        >
          <MaterialIcons name="arrow-left" size={20} color="white" /> 
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
          All <Text className="text-green-600">Categories</Text>
        </Text>
        <Image
          source={require('../../assets/images/loginBear.png')} 
          className="w-10 h-10 rounded-full"
        />
      </View>

      <ScrollView className="flex-1 px-6 mt-4">
        <Text className="text-7xl font-bold text-gray-700">
          Choose Product {"\n"}With <Text className="text-green-600">Best Pricing.</Text>
        </Text>

        <View className="mt-8 space-y-4">
          {loading ? (
            <Text className="text-gray-700 text-center">Loading categories...</Text>
          ) : error ? (
            <Text className="text-red-500 text-center">{error}</Text>
          ) : categoriesList.length > 0 ? (
            categoriesList.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-[#094b34] p-4 rounded-lg items-center border border-gray-500 mb-4"
              >
                <Text className="text-lg text-white font-semibold">
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-gray-700 text-center">No categories available</Text>
          )}
        </View>
      </ScrollView>

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