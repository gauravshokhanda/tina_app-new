// MyOrders.tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons, FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function MyOrders() {
  const router = useRouter();
  const orders = useSelector((state: RootState) => state.order.orders);
  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  // Tax Calculation (Assuming 8% Sales Tax)
  const taxRate = 0.08;
  const subtotal = latestOrder ? latestOrder.items.reduce((total, item: any) => total + item.price, 0) : 0;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  if (!latestOrder) {
    return (
      <View className="flex-1 bg-[#E6F2ED] justify-center items-center">
        <Stack.Screen options={{ headerShown: false }} />
        <MaterialIcons name="remove-shopping-cart" size={60} color="#64CA96E5" />
        <Text className="text-lg font-semibold text-gray-700">No orders found</Text>
                    <TouchableOpacity
                    onPress={() => router.push("/Products")}
                    className="bg-[#1c3729e5] px-6 py-3 rounded-lg mt-6"
                    >
                    <Text className="text-white font-bold">Order Something</Text>
                    </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#E6F2ED]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mt-6">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
          <MaterialIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
          My <Text className="text-green-600">Orders</Text>
        </Text>
        <Entypo name="dots-three-vertical" size={24} color="gray" />
      </View>

      {/* Content */}
      <ScrollView className="px-4 mt-4 mb-20">
        {/* Shipping Address */}
        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="location-on" size={24} color="#64CA96E5" />
            <Text className="text-lg font-bold text-gray-800 ml-2">Shipping Address</Text>
          </View>
          <Text className="text-gray-600">{latestOrder.shippingAddress}</Text>
        </View>

        {/* Order Items */}
        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="shopping-cart" size={24} color="#64CA96E5" />
            <Text className="text-lg font-bold text-gray-800 ml-2">Order Items</Text>
          </View>
          {latestOrder.items.length > 0 ? (
              latestOrder.items.map((item, index) => (
                <View key={index}>
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                      <Image source={item.image} className="w-12 h-12 rounded-lg mr-2" />
                      <Text className="text-gray-800">{item.name}</Text>
                    </View>
                    <Text className="text-gray-800">${item.price.toFixed(2)}</Text>
                  </View>
                  {index < latestOrder.items.length - 1 && (
                    <View className="border-b border-gray-300 my-1" />
            )}
    </View>
  ))
) : (
  <Text className="text-gray-600 text-center my-2">No items in this order</Text>
)}

        </View>

        {/* Pricing Details with Tax Calculation */}
        <View className="bg-white p-4 rounded-lg shadow mb-4">
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
        </View>

        {/* Order Details */}
        <View className="bg-white p-4 rounded-lg shadow mb-4">
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
        </View>

        <View className="flex-row justify-between">
          <TouchableOpacity className="bg-[#274a38e5] p-4 rounded-lg items-center flex-1 flex-row justify-center mr-2">
            <FontAwesome name="whatsapp" size={24} color="white" />
            <Text className="text-white font-bold ml-2">Contact Seller</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#274a38e5] p-4 rounded-lg items-center flex-1 flex-row justify-center ml-2">
            <Ionicons name="location-outline" size={24} color="white" />
            <Text className="text-white font-bold ml-2">Track Shipment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View className="flex-row justify-around bg-[#64CA96E5] p-2 shadow">
        <TouchableOpacity onPress={() => router.push('/Welcome')} className="items-center">
          <MaterialIcons name="home" size={24} color="white" />
          <Text className="text-white text-xs">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Products')} className="items-center">
          <MaterialIcons name="local-mall" size={24} color="white" />
          <Text className="text-white text-xs">Products</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Account')} className="items-center">
          <MaterialIcons name="account-circle" size={24} color="white" />
          <Text className="text-white text-xs">Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Cart')} className="items-center">
          <MaterialIcons name="shopping-cart" size={24} color="white" />
          <Text className="text-white text-xs">Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}