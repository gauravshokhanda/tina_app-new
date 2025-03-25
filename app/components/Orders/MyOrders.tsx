import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image,SafeAreaView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons, FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../Services/store";
import Animated, { FadeIn, FadeInUp, Layout } from "react-native-reanimated";

export default function MyOrders() {
  const router = useRouter();
  const orders = useSelector((state: RootState) => state.order.orders);
  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  // Tax Calculation (Assuming 8% Sales Tax)
  const taxRate = 0.08;
  const subtotal = latestOrder ? latestOrder.items.reduce((total, item: any) => total + item.price * (item.quantity || 1), 0) : 0;
  const tax = subtotal * taxRate;
  const total = subtotal + tax; 

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

  return (
    <SafeAreaView className="flex-1 bg-[#E6F2ED]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mt-6">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
          <MaterialIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
          My <Text className="text-green-600">Orders</Text>
        </Text>
        <Entypo name="archive" size={24} color="#64CA96E5" />
      </View>

      {/* Content */}
      <ScrollView className="px-4 mt-4 mb-20">
        {/* Shipping Address */}
        <Animated.View
          entering={FadeInUp.duration(500)}
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
          entering={FadeInUp.duration(500).delay(200)}
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
                                    <Text className="text-gray-600">${item.price.toFixed(2)} x {item.quantity || 1}</Text>
                                </View>
                            </Animated.View>
                        ))
                    ) : (
            <Text className="text-gray-600 text-center my-2">No items in this order</Text>
          )}
        </Animated.View>

        {/* Pricing Details with Tax Calculation */}
        <Animated.View
                    entering={FadeInUp.duration(500).delay(300)}
                    layout={Layout.delay(100)}
                    className="bg-white p-4 rounded-lg shadow mb-4"
                >
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="attach-money" size={24} color="#64CA96E5" />
                        <Text className="text-lg font-bold text-gray-800 ml-2">Pricing Details</Text>
                    </View>
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-600">Subtotal</Text>
                        <Text className="text-gray-800">${subtotal.toFixed(2)}</Text>
                    </View>
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-600">Sales Tax (8%)</Text>
                        <Text className="text-gray-800">${tax.toFixed(2)}</Text>
                    </View>
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-600 font-bold">Total</Text>
                        <Text className="text-gray-800 font-bold">${total.toFixed(2)}</Text>
                    </View>
                </Animated.View>

        {/* Order Details */}
        <Animated.View
          entering={FadeInUp.duration(500).delay(400)}
          layout={Layout.delay(100)}
          className="bg-white p-4 rounded-lg shadow mb-4"
        >
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="receipt" size={24} color="#64CA96E5" />
            <Text className="text-lg font-bold text-gray-800 ml-2">Order Details</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600">Order ID</Text>
            <Text className="text-gray-800">{latestOrder.orderId}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600">Order Date</Text>
            <Text className="text-gray-800">{latestOrder.orderDate}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600">Delivery Date</Text>
            <Text className="text-gray-800">{latestOrder.deliveryDate}</Text>
          </View>
        </Animated.View>

        {/* Buttons */}
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={() => router.push("/components/Feedback/ContactSeller")} // Navigate to ContactSeller page
            className="bg-[#274a38e5] p-4 rounded-lg items-center flex-1 flex-row justify-center mr-2"
          >
            <FontAwesome name="whatsapp" size={24} color="white" />
            <Text className="text-white font-bold ml-2">Contact Seller</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/components/Feedback/TrackShipment")}
            className="bg-[#274a38e5] p-4 rounded-lg items-center flex-1 flex-row justify-center ml-2"
          >
            <Ionicons name="location-outline" size={24} color="white" />
            <Text className="text-white font-bold ml-2">Track Shipment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}