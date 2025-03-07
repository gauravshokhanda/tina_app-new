import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Animated, Easing } from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../components/Cart/cartReducer";
import { setProducts } from "../components/Products/productReducer";
import { RootState, AppDispatch } from "../Services/store";
import LottieView from 'lottie-react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  description: string;
  features: string[];
}

const products: Product[] = [
  {
    id: "1",
    name: "1-12 Bags\n13 Gallon",
    price: 58,
    image: require("../../assets/images/welcome.png"),
    description: "A versatile pack of trash bags, ideal for small households or occasional use. Reliable and durable.",
    features: [
      "Strong and leak-proof",
      "Perfect for light to medium loads",
      "Fits standard 13-gallon trash cans",
      "Made from recycled materials",
    ],
  },
  {
    id: "2",
    name: "12-16 Bags\n13 Gallon",
    price: 70,
    image: require("../../assets/images/product2.png"),
    description: "A convenient pack for families needing extra durability and capacity. Suitable for daily use.",
    features: [
      "Reinforced strength for heavier loads",
      "Tear-resistant design",
      "Fits all 13-gallon kitchen trash cans",
      "Odor control technology",
    ],
  },
  {
    id: "3",
    name: "16-20 Bags\n13 Gallon",
    price: 101,
    image: require("../../assets/images/product2.png"),
    description: "Premium trash bags designed for busy households and commercial use. High load capacity.",
    features: [
      "Extra-thick material for added durability",
      "Leak-proof and puncture-resistant",
      "Flexible design to prevent overfilling tears",
      "Made from biodegradable materials",
    ],
  },
  {
    id: "4",
    name: "20-24 Bags\n13 Gallon",
    price: 139,
    image: require("../../assets/images/product2.png"),
    description: "Large bulk pack, ideal for businesses and high-waste environments. Dependable and eco-conscious.",
    features: [
      "Maximum durability for heavy-duty use",
      "Extra-large rolls for convenience",
      "Tear and leak-resistant",
      "Made from 100% recycled materials",
    ],
  },
  {
    id: "5",
    name: "Additional\nBags",
    price: 3.0,
    image: require("../../assets/images/product5.png"),
    description: "A small add-on pack of high-quality trash bags for occasional extra needs.",
    features: [
      "Lightweight but durable",
      "Great for quick replacements",
      "Fits all 13-gallon trash bins",
      "Affordable and eco-friendly",
    ],
  },
  {
    id: "6",
    name: "Additional\nBags",
    price: 21,
    image: require("../../assets/images/product6.png"),
    description: "Extra trash bags for convenience, perfect for stocking up and reducing waste trips.",
    features: [
      "Reliable and easy to use",
      "Tear-resistant for added security",
      "Compatible with most 13-gallon bins",
      "Eco-conscious and sustainable",
    ],
  },

];

export default function Item() {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const product = products.find((p) => p.id === productId);
  const scaleValue = new Animated.Value(1);
  const fadeValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const increaseQuantity = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity: 1 }));
      setQuantity(quantity + 1);
      animateButton();
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1 && product) {
      dispatch(removeFromCart(product.id));
      setQuantity(quantity - 1);
      animateButton();
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
      Alert.alert("Added to Cart", `${quantity} x ${product.name} added to cart.`);
      router.push("/components/Cart/Cart");
    }
  };

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
              source={product.image}
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
              <Text className="text-gray-700 ml-2 flex-1 text-lg">{product.description}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeValue }}>
          <View className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <Text className="text-xl font-extrabold text-gray-900 mb-3">⚡ Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <MaterialIcons name="check-circle" size={20} color="green" />
                <Text className="text-gray-600 ml-2">{feature}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeValue }}>
          <View className="bg-white p-4 rounded-lg shadow-lg mb-4 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-800">Quantity</Text>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={decreaseQuantity} className="p-2 bg-green-500 rounded-full">
                <MaterialIcons name="remove" size={24} color="white" />
              </TouchableOpacity>
              <Text className="text-xl font-bold text-gray-800 mx-4">{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity} className="p-2 bg-green-500 rounded-full">
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeValue }}>
          <TouchableOpacity className="bg-[#64CA96E5] p-4 rounded-lg items-center mb-4" onPress={handleAddToCart}>
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