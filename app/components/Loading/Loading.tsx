// components/Loading.tsx
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";



export default function Loading() {
  return (
    <View className="flex-1 bg-[#E6F2ED] justify-center items-center">
      <ActivityIndicator size="large" color="#64CA96" />
    </View>
  );
}