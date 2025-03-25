import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { View, Text, TouchableOpacity, Image, ScrollView,SafeAreaView } from "react-native";
=======
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
>>>>>>> staging
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import client from "../Apis/client"; 
import Loading from "../components/Loading/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../Services/store";

interface Category  {
  id: number;
  name: string;
  image: { uri: string } | number;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export default function Categories() {
  const router = useRouter();
    const user = useSelector((state: RootState) => state?.user);
    // console.log("User Name:", user);
    const [category, setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
          const fetchCategories = async () => {
          try {
              const categoryData = await client.getCategories();
              // console.log("Fetched Category Data:", CategoryData);
              
              const formattedCategory = categoryData.map((item: any) => ({
              id: item.id,
              name: item.name || item.title || "Unnamed Category",
              }));
              //Alert.alert("Categories Loaded", JSON.stringify(formattedCategory, null, 2)); 
              setCategory(formattedCategory);
          } catch (error) {
            Alert.alert("Error", "Failed to fetch categories.");
          } finally {
              setLoading(false);
          }
          };
  
          fetchCategories();
      }, []);
  
      if (loading) {
          return <Loading />;
      }

  return (
    <SafeAreaView className="flex-1 bg-[#E6F2ED]">
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
          {category.map((items, index) => ( 
            <TouchableOpacity
            key={items.id}
            onPress={() => router.push({
              pathname: "/components/Products/Products",
              params: { categoryId: items.id }
            })}
            className="bg-[#094b34] p-4 rounded-lg items-center border border-gray-500 mb-4"
        >
            <Text className="text-lg text-white font-semibold">{items.name}</Text>
        </TouchableOpacity>
        
          ))}
        </View>
      </ScrollView>
<<<<<<< HEAD

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
    </SafeAreaView>
=======
    </View>
>>>>>>> staging
  );
}