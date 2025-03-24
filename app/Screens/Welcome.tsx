import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import client from "../Apis/client";
import type { RootState } from "../Services/store";
import Loading from "../components/Loading/Loading";

interface Product {
  id: number;
  name: string;
  image: { uri: string } | number;
  price: string;
}

interface Category {
  id: number;
  name: string;
  image: { uri: string } | number;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export default function Welcome() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state?.user);
  // console.log("User Name:", user);

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await client.getProducts(
          "/shortapi/v1/products",
          user.token
        );
        // console.log("Fetched Products Data:", productData);

        const formattedProducts = productData.slice(0, 4).map((item: any) => ({
          id: item.id,
          name: item.name || "name",
          image: item.image ? { uri: item.image } : "",
          price: item.price || "N/A",
        }));
        // console.log("formattedProducts", formattedProducts);
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  {
    /*const categories = [
        { id: 1, name: "One Time Pick-Ups", icon: "local-shipping" },
        { id: 2, name: "Weekly Removal", icon: "autorenew" },
        { id: 3, name: "Service - Recurring", icon: "repeat" },
    ];*/
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await client.getCategories(user.token);
        // console.log("Fetched Category Data:", CategoryData);

        const formattedCategory = categoryData.slice(0, 4).map((item: any) => ({
          id: item.id,
          name: item.name || "name",
          image: item.image?.src ? { uri: item.image.src } : "",
        }));
        setCategory(formattedCategory);
      } catch (error) {
        console.error("Failed to fetch Categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // const products = [
  //     { id: 1, name: "6-15 Bags\n13 gallon", image: require("../../assets/images/Bags_13_Gallon_6_15.jpg") },
  //     { id: 2, name: "18-24 Bags\n13 gallon", image: require("../../assets/images/Bags_13_Gallon_18_24.jpg") },
  //     { id: 3, name: "16-20 Bags\n13 gallon", image: require("../../assets/images/Small_Home_To_Medium.jpg") },
  // ];

  return (
    <View className="flex-1 bg-[#d8f4ed]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Welcome Section */}
      <View className="flex-row justify-between items-center mb-5">
        <View>
          <Text className="mt-4 text-4xl font-bold pt-6">Hello!,</Text>
          <Text className="ml-6 text-4xl font-bold">
            Welcome! {user?.user_display_name}
          </Text>
          <Text className="text-4xl font-bold text-[#045B51EE] pt-3 left-[94]">
            Appalachian{"\n"}Trash-B-Gone
          </Text>
        </View>
        <Image
          source={require("../../assets/images/loginBear.png")}
          className="w-16 h-16 rounded-full bottom-[30]"
        />
      </View>

      {/* Categories Section */}
      <View className="mb-5 px-4">
        <Text className="text-lg font-bold mb-4 pb-2">Categories</Text>

        <FlatList
          data={category}
          key={"horizontal-list"}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/components/Products/Products",
                  params: { categoryId: item.id },
                })
              }
              key={item.id}
              className="bg-white rounded-lg w-36 p-3 items-center  mx-2"
            >
              <Image
                source={item.image}
                className="w-20 h-20 rounded-lg"
                resizeMode="contain"
                onError={() =>
                  console.log(`Failed to load image for ${item.name}`)
                } // Debug image loading
              />
              <Text className="text-center text-md font-bold mt-2 text-[#000c0bee]">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
        {/* See All Button */}
        <TouchableOpacity
          onPress={() => router.push("/constants/Categories")}
          className="bg-[#045B51EE] p-3 rounded-lg self-end mt-4"
        >
          <Text className="text-white font-bold">See all →</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-5 px-4">
        <Text className="text-lg font-bold mb-4 pb-2">Products</Text>

        <FlatList
          data={products}
          key={"horizontal-list"}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "/constants/Item",
                  params: { productId: item.id },
                })
              }
              className="bg-white rounded-lg w-36 p-3 items-center  mx-2"
            >
              <Image
                source={item.image}
                className="w-20 h-20 rounded-lg"
                resizeMode="contain"
              />
              <Text className="text-center text-md font-bold mt-2 text-[#000101ee]">
                {item.name}
              </Text>
              <Text className="text-center text-sm text-[#010704] font-semibold mt-1">
                ${item.price}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* See All Button */}
        <TouchableOpacity
          onPress={() => router.push("/components/Products/Products")}
          className="bg-[#045B51EE] p-3 rounded-lg self-end mt-4"
        >
          <Text className="text-white font-bold">See all →</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
}
