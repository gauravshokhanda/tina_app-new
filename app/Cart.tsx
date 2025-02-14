    // Cart.tsx
    import React from "react";
    import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
    import { useRouter, Stack } from "expo-router";
    import { MaterialIcons } from "@expo/vector-icons";
    import { useSelector, useDispatch } from "react-redux";
    import { removeFromCart, clearCart } from "./cartReducer";
    import { RootState } from "./store";

    export default function Cart() {
    const router = useRouter();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
    }, 0);

    if (cart.length === 0) {
        return (
        <View className="flex-1 bg-[#cdefe1] justify-center items-center">
            <Stack.Screen options={{ headerShown: false }} />
            <MaterialIcons name="remove-shopping-cart" size={60} color="#64CA96E5" />
            <Text className="text-2xl font-semibold text-gray-700 mt-4">Your cart is empty</Text>
            <TouchableOpacity
            onPress={() => router.push("/Products")}
            className="bg-[#1c3729e5] px-6 py-3 rounded-lg mt-6"
            >
            <Text className="text-white font-bold">Shop Now</Text>
            </TouchableOpacity>
        </View>
        );
    }

    return (
        <View className="flex-1 bg-[#E6F2ED] p-4">
        <Stack.Screen options={{ headerShown: false }} />
        {/* Background Image */}
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
                <Image
                    source={require('../assets/images/mountain.png')}
                    className="w-90 h-90 opacity-100"
                    resizeMode="contain"/>
            </View>

        {/* Header */}
        <View className="flex-row items-center justify-between py-4">
            <TouchableOpacity onPress={() => router.push("/Products")} className="p-2 rounded-full bg-[#64CA96E5]">
            <MaterialIcons name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-700">Shopping Cart</Text>
            <Image source={require("../assets/images/loginBear.png")} className="w-10 h-10 rounded-full" />
        </View>

        {/* Cart Items */}
        <FlatList
            data={cart}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            renderItem={({ item }) => (
            <View className="bg-white p-2 m-2 rounded-lg flex-row items-center justify-between shadow-md gap-x-4">
                <Image source={item.image} className="w-16 h-16" resizeMode="contain" />
                <Text className="text-gray-800 font-semibold flex-1 ml-2">{item.name}</Text>
                <Text className="text-lg font-bold text-gray-700">${item.price}</Text>
                <Text className="text-lg font-bold text-gray-700">x {item.quantity || 1}</Text>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)} className="p-2">
                <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
            </View>
            )}
        />

        {/* Total Price and Checkout */}
        <View className="flex-row justify-between bg-[#64CA96E5] p-4 mt-4 rounded-lg mb-20">
            <Text className="text-white text-lg font-bold">Total: ${totalPrice.toFixed(2)}</Text>
            <TouchableOpacity
            className="bg-[#045B51EE] px-4 py-2 rounded-lg"
            onPress={() => router.push({ pathname: "/Transactions", params: { cart: encodeURIComponent(JSON.stringify(cart)) } })}
            >
            <Text className="text-white">Checkout</Text>
            </TouchableOpacity>
        </View>

        {/* Bottom Navigation Bar */}
        <View className="absolute bottom-0 left-0 right-0 flex-row justify-around bg-[#64CA96E5] p-2 shadow mt-7">
            <TouchableOpacity onPress={() => router.push("/Welcome")} className="items-center">
            <MaterialIcons name="home" size={24} color="white" />
            <Text className="text-white text-xs">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/Products")} className="items-center">
            <MaterialIcons name="local-mall" size={24} color="white" />
            <Text className="text-white text-xs">Products</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/Account")} className="items-center">
            <MaterialIcons name="account-circle" size={24} color="white" />
            <Text className="text-white text-xs">Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/Cart")} className="items-center">
            <MaterialIcons name="shopping-cart" size={24} color="white" />
            <Text className="text-white text-xs">Cart</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    }