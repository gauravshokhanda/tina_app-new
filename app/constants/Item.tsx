import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Animated, ActivityIndicator } from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../Services/store";
import client from "../Apis/client";

interface Product {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
  stock_status: string;
}

export default function Item() {
  const router = useRouter();
  const { productId } = useLocalSearchParams(); 
  console.log("ProductId from params:", productId);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fadeValue = useState(new Animated.Value(0))[0]; 
  const { token } = useSelector((state: RootState) => state?.user);

  useEffect(() => {
    const fetchProductById = async () => {
      setLoading(true);
      try {
        const productData = await client.getProductById(productId, token);
        console.log("API Response:", productData);

        if (productData) {
          setProduct({
            id: productData.id,
            name: productData.name || "Unknown Product",
            images: productData.images || [],
            price: productData.price || "N/A",
            stock_status: productData.stock_status || "N/A",
          });
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [productId, token]); 

  useEffect(() => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);


  if (loading) {
    return (
      <View className="flex-1 bg-[#E6F2ED] justify-center items-center">
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color="#64CA96E5" />
        <Text className="text-xl font-semibold text-gray-700 mt-2">Loading Product...</Text>
      </View>
    );
  }


  if (!product) {
    return (
      <View className="flex-1 bg-[#E6F2ED] justify-center items-center">
        <Stack.Screen options={{ headerShown: false }} />
        <Text className="text-2xl font-semibold text-gray-700">Product not found</Text>
        <TouchableOpacity
          onPress={() => router.push("/components/Products/Products")}
          className="bg-[#64CA96E5] px-6 py-3 rounded-lg mt-6"
        >
          <Text className="text-white font-bold">Back to Products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <Stack.Screen options={{ headerShown: false }} />
      <Animated.View style={{ opacity: fadeValue }}>
        <View className="flex-row items-center justify-between px-4 py-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
            <MaterialIcons name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-700">
            <Text className="text-green-600">Product</Text> Details
          </Text>
          <MaterialIcons name="store" size={28} color="black" />
        </View>
      </Animated.View>

      <ScrollView className="px-4 mt-4 mb-20">
        <Animated.View style={{ opacity: fadeValue }}>
          <View className="items-center mb-4">
            <Image
              source={{ uri: product.images[0]?.src || "https://via.placeholder.com/150" }}
              className="w-60 h-60 rounded-lg"
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeValue }}>
          <View className="bg-white p-6 rounded-lg shadow-lg mb-4">
            <Text className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</Text>
            <View className="flex-row items-center mb-2">
              <MaterialIcons name="account-balance-wallet" size={24} color="green" />
              <Text className="text-2xl font-bold text-green-600 ml-1">${product.price}</Text>
            </View>
            <View className="flex-row items-start">
              <MaterialIcons name="description" size={20} color="gray" />
              <Text className="text-gray-700 ml-2 flex-1 text-lg">Stock Status: {product.stock_status}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeValue }}>
          <TouchableOpacity className="bg-[#64CA96E5] p-4 rounded-lg items-center mb-4">
            <Text className="text-white font-bold">Add to Cart</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      <View className="flex-row justify-around bg-[#64CA96E5] p-2 shadow absolute bottom-0 left-0 right-0 rounded-t-[20px]">
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
