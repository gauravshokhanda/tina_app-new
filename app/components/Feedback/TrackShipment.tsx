import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../Services/store";
import Animated, { FadeIn, FadeInUp, Layout } from "react-native-reanimated";
import moment from "moment"; 

export default function TrackShipment() {
    const router = useRouter();
    const orders = useSelector((state: RootState) => state.order.orders);
    const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

    if (!latestOrder) {
        return (
            <View className="flex-1 bg-[#E6F2ED] justify-center items-center">
                <Stack.Screen options={{ headerShown: false }} />
                <MaterialIcons name="remove-shopping-cart" size={60} color="#64CA96E5" />
                <Text className="text-lg font-semibold text-gray-700">No orders found</Text>
                <TouchableOpacity
                    onPress={() => router.push("/components/Products/Products")}
                    className="bg-[#1c3729e5] px-6 py-3 rounded-lg mt-6"
                >
                    <Text className="text-white font-bold">Order Something</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Calculate dynamic timestamps
    const orderDate = moment(latestOrder.orderDate);
    const shippedDate = orderDate.clone().add(2, "days").format("YYYY-MM-DD"); // Shipped 2 days after order
    const outForDeliveryDate = orderDate.clone().add(4, "days").format("YYYY-MM-DD"); // Out for delivery 4 days after order
    const deliveredDate = latestOrder.deliveryDate; //I Used the provided delivery date

    return (
        <View className="flex-1 bg-[#E6F2ED]">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
                <View className="flex-row items-center justify-between px-4 mt-6">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
                        <MaterialIcons name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold text-gray-700">
                        Track <Text className="text-green-600">Shipment</Text>
                    </Text>
                    <MaterialIcons name="route" size={25} color="green" />
                </View>

            {/* Content */}
            <ScrollView className="px-4 mt-4 mb-20">
                {/* Shipment Status */}
                <Animated.View
                    entering={FadeInUp.duration(500)}
                    layout={Layout.delay(100)}
                    className="bg-white p-4 rounded-lg shadow mb-4"
                >
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="location-outline" size={24} color="#64CA96E5" />
                        <Text className="text-lg font-bold text-gray-800 ml-2">Shipment Status</Text>
                    </View>
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-600">Order ID</Text>
                        <Text className="text-gray-800">{latestOrder.orderId}</Text>
                    </View>
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-600">Current Status</Text>
                        <Text className="text-green-600 font-bold">In Transit</Text>
                    </View>
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-600">Estimated Delivery</Text>
                        <Text className="text-gray-800">{deliveredDate}</Text>
                    </View>
                </Animated.View>

                {/* Tracking Timeline */}
                <Animated.View
                    entering={FadeInUp.duration(500).delay(200)}
                    layout={Layout.delay(100)}
                    className="bg-white p-4 rounded-lg shadow mb-4"
                >
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="timeline" size={24} color="#64CA96E5" />
                        <Text className="text-lg font-bold text-gray-800 ml-2">Tracking Timeline</Text>
                    </View>
                    <View className="space-y-4">
                        {/* Order Placed */}
                        <View className="flex-row items-center">
                            <View className="w-6 h-6 bg-green-600 rounded-full items-center justify-center">
                                <MaterialIcons name="check" size={16} color="white" />
                            </View>
                            <Text className="text-gray-800 ml-2">Order Placed</Text>
                            <Text className="text-gray-600 ml-auto">{orderDate.format("YYYY-MM-DD")}</Text>
                        </View>

                        {/* Shipped */}
                        <View className="flex-row items-center">
                            <View className="w-6 h-6 bg-green-600 rounded-full items-center justify-center">
                                <MaterialIcons name="check" size={16} color="white" />
                            </View>
                            <Text className="text-gray-800 ml-2">Shipped</Text>
                            <Text className="text-gray-600 ml-auto">{shippedDate}</Text>
                        </View>

                        {/* Out for Delivery */}
                        <View className="flex-row items-center">
                            <View className="w-6 h-6 bg-gray-300 rounded-full items-center justify-center">
                                <MaterialIcons name="location-on" size={16} color="white" />
                            </View>
                            <Text className="text-gray-800 ml-2">Out for Delivery</Text>
                            <Text className="text-gray-600 ml-auto">{outForDeliveryDate}</Text>
                        </View>

                        {/* Delivered */}
                        <View className="flex-row items-center">
                            <View className="w-6 h-6 bg-gray-300 rounded-full items-center justify-center">
                                <MaterialIcons name="home" size={16} color="white" />
                            </View>
                            <Text className="text-gray-800 ml-2">Delivered</Text>
                            <Text className="text-gray-600 ml-auto">{deliveredDate}</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Shipping Address */}
                <Animated.View
                    entering={FadeInUp.duration(500).delay(300)}
                    layout={Layout.delay(100)}
                    className="bg-white p-4 rounded-lg shadow mb-4"
                >
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="location-on" size={24} color="#64CA96E5" />
                        <Text className="text-lg font-bold text-gray-800 ml-2">Shipping Address</Text>
                    </View>
                    <Text className="text-gray-600">{latestOrder.shippingAddress}</Text>
                </Animated.View>

                {/* Order Items */}
                <Animated.View
                    entering={FadeInUp.duration(500).delay(400)}
                    layout={Layout.delay(100)}
                    className="bg-white p-4 rounded-lg shadow mb-4"
                >
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="shopping-cart" size={24} color="#64CA96E5" />
                        <Text className="text-lg font-bold text-gray-800 ml-2">Order Items</Text>
                    </View>
                    {latestOrder.items.length > 0 ? (
                        latestOrder.items.map((item, index) => (
                            <Animated.View
                                key={index}
                                entering={FadeIn.duration(500).delay(index * 100)}
                                layout={Layout.delay(100)}
                                className="flex-row items-center py-3 border-b border-gray-200"
                            >
                                <Image source={item.image} className="w-16 h-16 rounded-lg" />
                                <View className="flex-1 ml-4">
                                    <Text className="text-gray-800 font-medium">{item.name}</Text>
                                    <Text className="text-gray-600">${item.price.toFixed(2)}</Text>
                                </View>
                            </Animated.View>
                        ))
                    ) : (
                        <Text className="text-gray-600 text-center my-2">No items in this order</Text>
                    )}
                </Animated.View>
            </ScrollView>

            {/* Bottom Navigation Bar 
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
            </View>*/}
        </View>
    );
}