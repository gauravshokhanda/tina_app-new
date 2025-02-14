import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Privacy() {
const router = useRouter();

return (
    <View className="flex-1 bg-[#E6F2ED]">
    <Stack.Screen options={{ headerShown: false }} />

      {/* Background Image */}
    <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
        <Image
        source={require("../assets/images/dustbin.png")}
        className="w-90 h-90 opacity-100"
        resizeMode="contain"
        />
    </View>

      {/* Header */}
    <View className="flex-row items-center justify-between px-4 mt-6">
        <TouchableOpacity
        onPress={() => router.back()}
        className="p-2 rounded-full bg-[#64CA96E5]"
        >
        <MaterialIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
        Privacy & <Text className="text-green-600">Policy</Text>
        </Text>
        <MaterialIcons name="more-horiz" size={24} color="gray" />
    </View>
    
      {/* Content */}
    <ScrollView className="px-4 mt-4 mb-20">
        {/* Section 1 */}
        <View className="flex-row items-center mt-10">
            <MaterialIcons name="data-usage" size={24} color="#64CA96" />
            <Text className="text-lg font-bold text-gray-900 ml-2">
            Types of Data We Collect
        </Text>
        </View>
        <Text className="text-gray-700 mt-2">
            We collect various types of information, including:
            {"\n"}• Personal data (e.g., name, email, phone number)
            {"\n"}• Usage data (e.g., app interactions, IP address)
            {"\n"}• Location data (if you grant permission)
        </Text>

        {/* Section 2 */}
        <View className="flex-row items-center mt-10">
            <MaterialIcons name="privacy-tip" size={24} color="#64CA96" />
            <Text className="text-lg font-bold text-gray-800 ml-2">
                Use of Your Personal Data
            </Text>
        </View>
        <Text className="text-gray-700 mt-2">
            Your data is used to:
            {"\n"}• Provide and improve our services
            {"\n"}• Personalize your experience
            {"\n"}• Communicate with you (e.g., updates, promotions)
            {"\n"}• Ensure app security and prevent fraud
        </Text>

        {/* Section 3 */}
        <View className="flex-row items-center mt-10">
            <MaterialIcons name="share" size={24} color="#64CA96" />
            <Text className="text-lg font-bold text-gray-800 ml-2">
                Disclosure of Your Personal Data
            </Text>
        </View>
        <Text className="text-gray-700 mt-2">
            We may share your data with:
            {"\n"}• Trusted third-party service providers
            {"\n"}• Legal authorities (if required by law)
            {"\n"}• Business partners (with your consent)
        </Text>

        {/* Section 4 */}
        <View className="flex-row items-center mt-10">
        <MaterialIcons name="security" size={24} color="#64CA96" />
        <Text className="text-lg font-bold text-gray-800 ml-2">
            Data Security
        </Text>
        </View>
        <Text className="text-gray-700 mt-2">
        We implement robust security measures to protect your data, including:
        {"\n"}• Encryption of sensitive information
        {"\n"}• Regular security audits
        {"\n"}• Restricted access to personal data
        </Text>

        {/* Section 5 */}
        <View className="flex-row items-center mt-10">
        <MaterialIcons name="update" size={24} color="#64CA96" />
        <Text className="text-lg font-bold text-gray-800 ml-2">
            Changes to This Policy
        </Text>
        </View>
        <Text className="text-gray-700 mt-2 mb-10">
        We may update this policy from time to time. You will be notified of any significant changes via email or in-app notifications.
        </Text>
    </ScrollView>
    </View>
);
}