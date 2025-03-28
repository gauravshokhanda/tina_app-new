// Cart.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Animated,SafeAreaView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./cartReducer";
import { RootState } from "../../Services/store";

export default function Cart() {
    const router = useRouter();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        }).start();
    }, []);

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
    }, 0);

    // Empty State
    if (cart.length === 0) {
        return (
        <View className="flex-1 bg-[#cdefe1] justify-center items-center">
            <Stack.Screen options={{ headerShown: false }} />
            <Animated.View style={{ opacity: fadeAnim }} className="items-center">
            <View className="bg-white p-6 rounded-full shadow-md">
                <MaterialIcons name="remove-shopping-cart" size={60} color="#64CA96E5" />
            </View>
            <Text className="text-2xl font-semibold text-gray-700 mt-4">Your Cart is Empty</Text>
            <Text className="text-gray-600 text-center mt-2 px-4">
                Start adding some amazing products!
            </Text>
            <TouchableOpacity
                onPress={() => router.push("../../components/Products/Products")}
                className="bg-[#1c3729e5] px-6 py-3 rounded-lg mt-6 shadow-md flex-row items-center"
            >
                <MaterialIcons name="shopping-cart-checkout" size={25} color="white" />
                <Text className="text-white font-bold ml-2">Explore Products</Text>
            </TouchableOpacity>
            </Animated.View>
        </View>
        );
    }

    // Card Design
    const renderItem = ({ item }: { item: any }) => (
        <Animated.View 
        style={{ opacity: fadeAnim }}
        className="bg-white p-3 m-2 rounded-lg flex-row items-center justify-between shadow-md gap-x-4 border border-gray-100"
        >
        <Image 
            source={item.image} 
            className="w-16 h-16 rounded-md bg-gray-50" 
            resizeMode="contain" 
        />
        <View className="flex-1 ml-2">
            <Text className="text-black font-semibold">{item.name}</Text>
            <Text className="text-gray-700 mt-1">${item.price} x {item.quantity || 1}</Text>
        </View>
        <TouchableOpacity 
            onPress={() => handleRemoveItem(item.id)} 
            className="p-2 bg-red-50 rounded-full"
        >
            <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
        </Animated.View>
    );

    return (
        <SafeAreaView className="flex-1 bg-[#E6F2ED]">
        <Stack.Screen options={{ headerShown: false }} />
        {/* Background Image */}
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
            <Image
            source={require('../../../assets/images/mountain.png')}
            className="w-90 h-90 opacity-50"
            resizeMode="contain"
            />
        </View>

        {/* Header */}
        <View className="flex-row items-center justify-between py-4">
            <TouchableOpacity 
            onPress={() => router.push("../../components/Products/Products")} 
            className="p-2 rounded-full bg-[#64CA96E5]"
            >
            <MaterialIcons name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-700">Shopping Cart</Text>
            <Image 
            source={require("../../../assets/images/loginBear.png")} 
            className="w-10 h-10 rounded-full" 
            />
        </View>

        {/* Cart Items */}
        <FlatList
            data={cart}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            renderItem={renderItem}
        />

        {/*  Checkout Section */}
        <View className="flex-row justify-between bg-[#64CA96E5] p-4 mt-4 rounded-lg mb-20 items-center shadow-md">
            <View>
            <Text className="text-white text-sm">Total ({cart.length} items)</Text>
            <Text className="text-white text-lg font-bold">${totalPrice.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
            className="bg-[#045B51EE] px-6 py-3 rounded-lg flex-row items-center shadow-md"
            onPress={() => router.push({ 
                pathname: "../../constants/Transactions", 
                params: { cart: encodeURIComponent(JSON.stringify(cart)) }
            })}
            >
            <MaterialIcons name="shopping-cart-checkout" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Checkout</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
    }