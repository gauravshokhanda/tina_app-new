import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Linking,
  SafeAreaView,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";

export default function ContactSeller() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  // WhatsApp contact link
  const whatsappLink = "https://wa.me/9568259784"; // the seller's WhatsApp number

  // Handle form submission
  const handleSubmit = () => {
    if (!message.trim()) {
      Alert.alert("Error", "Please enter a message.");
      return;
    }
    Alert.alert("Success", "Your message has been sent to the seller.");
    setMessage(""); // Clear the input
  };

  // Open WhatsApp
  const openWhatsApp = () => {
    Linking.openURL(whatsappLink).catch(() => {
      Alert.alert("Error", "Unable to open WhatsApp.");
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E6F2ED]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mt-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full bg-[#64CA96E5]"
        >
          <MaterialIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
          Contact <Text className="text-green-600">Seller</Text>
        </Text>
        <Entypo name="phone" size={24} color="#64CA96E5" />
      </View>

      {/* Content */}
      <ScrollView className="px-4 pb-20">
        {/* Seller Profile */}
        <View className="items-center mb-6">
          <Image
            source={require("../../../assets/images/loginBear.png")}
            className="w-24 h-24 rounded-full mb-2"
          />
          <Text className="text-xl font-bold text-gray-800">Manish Sirohi</Text>
          <Text className="text-sm text-gray-600">
            Experienced Seller | 5-Star Rating
          </Text>
        </View>

        {/* Contact Form */}
        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Send a Message
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4 text-base"
            placeholder="Type your message here..."
            multiline
            numberOfLines={5}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-[#64CA96E5] p-3 rounded-lg items-center"
          >
            <Text className="text-white font-bold">Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* WhatsApp Button */}
        <TouchableOpacity
          onPress={openWhatsApp}
          className="bg-[#25D366] p-3 rounded-lg items-center flex-row justify-center mb-4"
        >
          <FontAwesome name="whatsapp" size={24} color="white" />
          <Text className="text-white font-bold ml-2">
            Contact via WhatsApp
          </Text>
        </TouchableOpacity>

        {/* Seller Information */}
        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Seller Information
          </Text>
          <Text className="text-gray-600 mb-2">Seller Name: Manish Sirohi</Text>
          <Text className="text-gray-600 mb-2">
            Email: Sirohi.manish023@example.com
          </Text>
          <Text className="text-gray-600">Phone: +91-9568259784</Text>
        </View>

                {/* Testimonials */}
                <View className="bg-white p-4 rounded-lg shadow">
                    <Text className="text-lg font-bold text-gray-800 mb-4">What Buyers Say</Text>
                    <View className="mb-4">
                        <Text className="text-gray-600 mb-1">
                            "Great seller! Fast delivery and excellent communication."
                        </Text>
                        <Text className="text-sm text-gray-500 font-italic">- John Doe</Text>
                    </View>
                    <View className="mb-4">
                        <Text className="text-gray-600 mb-1">
                            "Highly recommended! The product was exactly as described."
                        </Text>
                        <Text className="text-sm text-gray-500 font-italic">- Jane Smith</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
