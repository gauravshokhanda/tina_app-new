// Feedback.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Feedback() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Error", "Please select a rating before submitting.");
      return;
    }

    console.log("Rating:", rating);
    console.log("Comment:", comment);

    Alert.alert("Thank You!", "Your feedback has been submitted successfully.", [
      { text: "OK", onPress: () => router.push("/Home") },
    ]);
  };

  return (
    <View className="flex-1 bg-[#E6F2ED] p-4">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between mb-6 mt-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
          <MaterialIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
          Feedback & <Text className="text-green-600">Support</Text>
        </Text>
        <View className="w-10" /> {/* Spacer */}
      </View>

      {/* Feedback Form */}
      <ScrollView className="flex-1">
        {/* Rating Section */}
        <View className="mb-6 mt-7">
          <Text className="text-lg font-bold text-gray-800 mb-6">How would you rate your experience?</Text>
          <View className="flex-row justify-between mb-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                <MaterialIcons
                  name={star <= rating ? "star" : "star-border"}
                  size={40}
                  color={star <= rating ? "#FFD700" : "#C0C0C0"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Comment Section */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-5">Your Feedback</Text>
          <TextInput
            className="bg-white p-10 rounded-lg text-gray-800 border border-gray-300"
            placeholder="Tell us how we can improve..."
            multiline
            numberOfLines={5}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-[#143a26e5] p-4 rounded-lg items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-bold">Submit Feedback</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#64CA96E5] p-2 shadow flex-row justify-around z-50">
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