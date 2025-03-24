import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, TextInput, Alert, Platform } from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Services/store";
import { setCart } from "../components/Cart/cartReducer";
import * as Location from "expo-location";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

export default function Transactions() {
    const router = useRouter();
    const { cart: initialCart } = useLocalSearchParams();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);
    const paymentDetails = useSelector((state: RootState) => state.payment);
    const [activeTab, setActiveTab] = useState("toPay");
    const [currentAddress, setCurrentAddress] = useState<string>("");
    const [manualAddress, setManualAddress] = useState("");
    const [isManual, setIsManual] = useState(false);

    useEffect(() => {
        try {
            if (initialCart && typeof initialCart === 'string') {
                const parsedCart = JSON.parse(decodeURIComponent(initialCart));
                dispatch(setCart(Array.isArray(parsedCart) ? parsedCart : []));
            } else {
                dispatch(setCart([]));
            }
        } catch (error) {
            console.error("Error parsing cart data:", error);
            dispatch(setCart([]));
        }
    }, [initialCart, dispatch]);

    const taxRate = 0.08; // 8% Sales Tax
    const totalAmount = cart.reduce((total, item) => {
        const price = parseFloat(String(item.price || "0").replace(/[^0-9.]/g, ''));
        return isNaN(price) ? total : total + price * (item.quantity || 1);
    }, 0);

    const totalWithTax = totalAmount * (1 + taxRate);

    const fetchCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Error", "Permission to access location was denied");
                return;
            }

            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            const { latitude, longitude } = location.coords;

            //console.log("Coordinates:", latitude, longitude);
            fetchAddressFromCoordinates(latitude, longitude);
        } catch (error) {
            console.error("Error fetching location:", error);
            Alert.alert("Error", "Failed to fetch location. Please try again.");
        }
    };

    const fetchAddressFromCoordinates = async (latitude: number, longitude: number): Promise<void> => {
        if (latitude === undefined || longitude === undefined) {
            console.error("Invalid coordinates:", latitude, longitude);
            Alert.alert("Error", "Invalid coordinates received.");
            return;
        }

        try {
            const apiKey = "pk.e6162c6f616190cebbf48b06cbe50efd";
            const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
            const response = await fetch(url);
            const data = await response.json();

            //console.log("API Response:", data);

            if (data.display_name) {
                setCurrentAddress(data.display_name);
            } else {
                console.error("No address found:", data);
                Alert.alert("Error", "Unable to fetch address. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            Alert.alert("Error", "Failed to fetch address. Please check your internet connection.");
        }
    };

    useEffect(() => {
        fetchCurrentLocation();
    }, []);

    const handleManualAddress = () => {
        setIsManual(true);
    };

    const confirmManualAddress = () => {
        setCurrentAddress(manualAddress);
        setIsManual(false);
    };

    const handlePayNow = () => {
        // Navigate to PayWithCard page with the total amount to pay
        router.push({
            pathname: "/components/Payments/PayWithCard",
            params: { totalAmount: totalWithTax.toFixed(2) },
        });
    };

    return (
        <View className="flex-1 bg-[#E6F2ED]">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Background Image */}
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
                <Image
                    source={require('../../assets/images/dustbin.png')}
                    className="w-90 h-90 opacity-100"
                    resizeMode="contain"
                />
            </View>

            {/* Header */}
            <View className="flex-row items-center justify-between px-4 mt-6">
                <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
                    <MaterialIcons name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-gray-700">
                    My <Text className="text-green-600">Transactions</Text>
                </Text>
                <Entypo name="wallet" size={24} color="#64CA96E5" />  
            </View>

            {/* Tabs for To Pay and Shipping Address */}
            <View className="flex-row justify-around mt-4 px-4">
                <TouchableOpacity
                    className={`p-2 rounded-lg ${activeTab === "toPay" ? "bg-[#64CA96E5]" : "bg-white"}`}
                    onPress={() => setActiveTab("toPay")}
                >
                    <Text className={`text-sm font-bold ${activeTab === "toPay" ? "text-white" : "text-gray-800"}`}>
                        To Pay
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`p-2 rounded-lg ${activeTab === "shippingAddress" ? "bg-[#64CA96E5]" : "bg-white"}`}
                    onPress={() => setActiveTab("shippingAddress")}
                >
                    <Text className={`text-sm font-bold ${activeTab === "shippingAddress" ? "text-white" : "text-gray-800"}`}>
                        Shipping Address
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content Based on Active Tab */}
            <ScrollView className="px-4 mt-4 mb-20">
                {/* Recent Transactions Section */}
                <Text className="text-lg font-bold text-gray-800 mt-6 mb-4">Recent Transactions</Text>
                {cart.length === 0 ? (
                    // Improved Empty State
                    <View className="items-center justify-center p-4 bg-white rounded-lg shadow-md">
                        <View className="bg-[#E6F2ED] p-4 rounded-full">
                            <MaterialIcons name="shopping-cart" size={60} color="#64CA96E5" />
                        </View>
                        <Text className="text-gray-700 font-semibold text-lg mt-4">Cart is Empty</Text>
                        <Text className="text-gray-600 mt-2 text-center">Add items to start your transaction!</Text>
                    </View>
                ) : (
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            // Improved Card Design
                            <View className="bg-white p-2 rounded-xl shadow-md mb-3 mx-1 flex-1 border border-gray-100">
                                <Image 
                                    source={item.image} 
                                    className="w-32 h-32 mb-2 rounded-lg self-center" 
                                    resizeMode="contain" 
                                />
                                <View className="flex-row justify-between items-center px-2">
                                    <View>
                                        <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
                                        <Text className="text-gray-600 text-sm">Qty: {item.quantity || 1}</Text>
                                        <Text className="text-gray-500 text-sm">Pending Payment</Text>
                                    </View>
                                    <Text className="text-base font-bold text-green-600">
                                        ${(parseFloat(String(item.price || "0").replace(/[^0-9.]/g, '')) * (item.quantity || 1)).toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                )}

                {/* To Pay Section */}
                {activeTab === "toPay" && cart.length > 0 && (
                    <View className="bg-white p-4 rounded-lg shadow mt-4">
                        <Text className="text-lg font-bold text-gray-800 mb-2">To Pay</Text>
                        <Text className="text-gray-600 mb-4">Pending Payment</Text>

                        {/* Total Amount to Pay */}
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold text-gray-800">Total Amount</Text>
                            <Text className="text-xl font-bold text-green-600">${totalWithTax.toFixed(2)}</Text>
                        </View>

                        {/* Payment Methods */}
                        <View className="flex-row justify-between mb-4">
                            <TouchableOpacity className="items-center">
                                <Image source={require("../../assets/images/paypal.jpeg")} className="w-12 h-12" />
                                <Text className="text-sm text-gray-800 mt-1">PayPal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="items-center">
                                <Image source={require("../../assets/images/alipay.jpeg")} className="w-12 h-12" />
                                <Text className="text-sm text-gray-800 mt-1">Alipay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="items-center">
                                <Image source={require("../../assets/images/card.jpeg")} className="w-12 h-12" />
                                <Text className="text-sm text-gray-800 mt-1">Cards</Text>
                            </TouchableOpacity>
                        </View>

                    {/* Display Payment Details 
                        <View className="bg-white p-4 rounded-lg shadow mt-4">
                            <Text className="text-lg font-bold text-gray-800 mb-2">Payment Details</Text>
                            <Text className="text-gray-600">Card Number: {paymentDetails.cardNumber}</Text>
                            <Text className="text-gray-600">Expiry Date: {paymentDetails.expiryDate}</Text>
                            <Text className="text-gray-600">CVV: {paymentDetails.cvv}</Text>
                        </View> */}

                        {/* Pay Now Button */}
                        <TouchableOpacity
                            className="bg-[#203c2ee5] p-2 rounded-lg items-center mt-4 mb-4"
                            onPress={() => router.push({ pathname: "/components/Payments/PayWithCard", params: { cart: encodeURIComponent(JSON.stringify(cart)) } })}
                        >
                            <MaterialIcons name="payment" size={18} color="white" />
                            <Text className="text-white font-bold">Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Shipping Address Section */}
                {activeTab === "shippingAddress" && (
                    <View className="bg-white p-4 rounded-lg shadow mt-4">
                        <Text className="text-lg font-bold text-gray-800 mb-2">Shipping Address</Text>
                        {!isManual ? (
                            <>
                                <Text className="text-sm font-bold text-gray-600 mt-3 mb-2">
                                    {currentAddress || "Fetching current address..."}
                                </Text>
                                <TouchableOpacity className="bg-[#1e3a2ce5] p-2 rounded-lg items-center mt-4" onPress={fetchCurrentLocation}>
                                    <MaterialIcons name="place" size={18} color="#4CAF50" />
                                    <Text className="text-white font-bold">Fetch Current Location</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="bg-[#1e3a2ce5] p-2 rounded-lg items-center mt-4" onPress={handleManualAddress}>
                                    <MaterialIcons name="edit" size={18} color="#4CAF50" />
                                    <Text className="text-white font-bold">Add Address Manually</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TextInput
                                    className="border border-gray-300 p-2 rounded-lg mt-4"
                                    placeholder="Enter your address"
                                    value={manualAddress}
                                    onChangeText={setManualAddress}
                                />
                                <TouchableOpacity className="bg-[#1e3a2ce5] p-2 rounded-lg items-center mt-4" onPress={confirmManualAddress}>
                                    <MaterialIcons name="check" size={18} color="#4CAF50" />
                                    <Text className="text-white font-bold">Confirm Manual Address</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}