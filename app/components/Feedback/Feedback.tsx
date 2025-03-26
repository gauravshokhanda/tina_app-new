import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert,SafeAreaView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Feedback() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedFeedbackType, setSelectedFeedbackType] = useState("");

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleFeedbackType = (type: string) => {
    setSelectedFeedbackType(type);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Error", "Please select a rating before submitting.");
      return;
    }

    if (!selectedFeedbackType) {
      Alert.alert("Error", "Please select a feedback type before submitting.");
      return;
    }

    console.log("Rating:", rating);
    console.log("Comment:", comment);
    console.log("Feedback Type:", selectedFeedbackType);

    Alert.alert("Thank You!", "Your feedback has been submitted successfully.", [
      { text: "OK", onPress: () => router.push("../Screens/Home") },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E6F2ED] p-4">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
          <MaterialIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
          Feedback & <Text className="text-green-600">Support</Text>
        </Text>
        <MaterialIcons name="sentiment-satisfied" size={24} color="#64CA96E5" />
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

        {/* Feedback Type Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-5">What type of feedback are you providing?</Text>
          <View className="flex-row flex-wrap justify-between">
            {["General", "Bug Report", "Feature Request", "Other"].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => handleFeedbackType(type)}
                className={`p-3 mb-3 rounded-lg ${
                  selectedFeedbackType === type ? "bg-[#64CA96E5]" : "bg-white"
                }`}
              >
                <Text
                  className={`text-lg ${
                    selectedFeedbackType === type ? "text-white" : "text-gray-800"
                  }`}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Comment Section */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-5">Your Feedback</Text>
          <TextInput
            className="bg-white p-4 rounded-lg text-gray-800 border border-gray-300"
            placeholder="Tell us how we can improve..."
            multiline
            numberOfLines={5}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        {/* Additional Feedback Section */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-5">Additional Feedback</Text>
          <TextInput
            className="bg-white p-4 rounded-lg text-gray-800 border border-gray-300"
            placeholder="Any additional comments or suggestions..."
            multiline
            numberOfLines={5}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-[#143a26e5] p-4 rounded-lg items-center mb-20"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-bold">Submit Feedback</Text>
        </TouchableOpacity>
      </ScrollView>

      
    </SafeAreaView>
  );
}