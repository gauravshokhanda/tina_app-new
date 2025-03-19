// Products.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageSourcePropType,
  ActivityIndicator
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Cart/cartReducer";
import { setProducts } from "./productReducer";
import { RootState, AppDispatch } from "../../Services/store";
import client from "../../Apis/client";
import Loading from "../../components/Loading/Loading";

interface Product {
  id: number;
  name: string;
  image: ImageSourcePropType;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Products() {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state?.user);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items) as CartItem[];
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await client.getProducts(token).catch((err) => {
          console.error("API Error:", err);
          return [];
        });
        // console.log("Fetched Products Data:", productData);

        const formattedProducts = productData.map((item: any) => ({
          id: item.id,
          name: item.name || "name",
          image:
            item.images && item.images.length > 0
              ? { uri: item.images[0].src }
              : "",
          price: item.price || "N/A",
        }));
        // console.log("Formatted Product:", formattedProducts);
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const changeQuantity = (itemId: number, action: "increase" | "decrease") => {
    const product = products.find((p) => p.id === itemId);
    if (!product) return;

    if (action === "increase") {
      dispatch(addToCart({ ...product, quantity: 1 }));
    } else {
      dispatch(removeFromCart(itemId));
    }
  };

  const isInCart = (itemId: number) => {
    return cart.some(
      (item: Product & { quantity: number }) => item.id === itemId
    );
  };

  const getQuantity = (itemId: number) => {
    const item = cart.find(
      (item: Product & { quantity: number }) => item.id === itemId
    );
    return item ? item.quantity : 0;
  };

  if (loading) {
    return <Loading />; 
  }

  if (products.length === 0) {
    return (
      <View className="flex-1 bg-[#E6F2ED] justify-center items-center">
        <Text className="text-2xl font-semibold text-gray-700">
          No products found
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/Screens/Welcome")}
          className="bg-[#64CA96E5] px-6 py-3 rounded-lg mt-6"
        >
          <Text className="text-white font-bold">Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#E6F2ED]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity
          onPress={() => router.push("/Screens/Welcome")}
          className="p-2 rounded-full bg-[#64CA96E5]"
        >
          <MaterialIcons name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
          <Text className="text-green-600">Products</Text> and Services
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/components/Cart/Cart",
              params: { cart: encodeURIComponent(JSON.stringify(cart)) },
            })
          }
        >
          <MaterialIcons name="shopping-cart" size={28} color="black" />
          {cart.length > 0 && (
            <View className="absolute -top-2 -right-2 bg-red-600 rounded-full px-2">
              <Text className="text-white text-xs">{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View className="mx-4 mt-2">
        <Image
          source={require("../../../assets/images/quotes.png")}
          className="w-full h-24 rounded-lg"
          resizeMode="cover"
        />
        <Text className="absolute bottom-2 left-4 text-white font-bold text-lg">
          Innovate Today. Sustain for Tomorrow
        </Text>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View className="bg-white p-2 m-2 rounded-lg items-center w-[45%] shadow-md">
            <Text className="text-lg font-bold text-right w-full text-gray-700">
              ${item.price}
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/constants/Item",
                  params: { productId: item.id },
                })
              }
              className="items-center"
            >
              <Image
                source={item.image}
                className="w-24 h-24"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className="text-center text-gray-800 font-semibold mt-2">
              {item.name}
            </Text>
            {isInCart(item.id) ? (
              <View className="flex-row items-center mt-2">
                <TouchableOpacity
                  onPress={() => changeQuantity(item.id, "decrease")}
                  className="bg-[#4CAF50] p-1 rounded-full"
                >
                  <MaterialIcons name="remove" size={18} color="white" />
                </TouchableOpacity>
                <Text className="mx-2">{getQuantity(item.id)}</Text>
                <TouchableOpacity
                  onPress={() => changeQuantity(item.id, "increase")}
                  className="bg-[#4CAF50] p-1 rounded-full"
                >
                  <MaterialIcons name="add" size={18} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                className="bg-[#64CA96E5] px-3 py-2 mt-2 rounded-lg flex-row items-center"
                onPress={() => handleAddToCart(item)}
              >
                <MaterialIcons name="shopping-cart" size={18} color="white" />
                <Text className="text-white ml-2">Add to Cart</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {/* Bottom Navigation Bar */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-around bg-[#64CA96E5] p-2 shadow mt-7">
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
}
