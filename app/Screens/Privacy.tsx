import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Animated, Easing } from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Privacy() {
    const router = useRouter();

    // Animation values
    const fadeAnim = new Animated.Value(0);
    const slideAnim = new Animated.Value(50);
    const params = useLocalSearchParams();

    useEffect(() => {
        // Fade-in animation
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        }).start();

        // Slide-up animation
        Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
        }).start();
    }, []);

    const handleBack = () => {
        if (params.from === "account") {
            router.push("/Screens/Account");
        } else if (params.from === "signin") {
            router.push("/components/Users/SignIn");
        } else {
            router.back();
        }
    };

    return (
        <LinearGradient colors={["#E6F2ED", "#FFFFFF"]} className="flex-1">
        <Stack.Screen options={{ headerShown: false }} />

        {/* Background Image */}
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
            <Image
            source={require("../../assets/images/dustbin.png")}
            className="w-90 h-90 opacity-80"
            resizeMode="contain"
            />
        </View>

        {/* Header */}
        <Animated.View
            style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            className="flex-row items-center justify-between px-4 mt-6"
        >
            <TouchableOpacity
            onPress={handleBack}
            className="p-2 rounded-full bg-[#64CA96E5] shadow-lg"
            >
            <MaterialIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-700">
            Privacy & <Text className="text-green-600">Policy</Text>
            </Text>
            <MaterialIcons name="privacy-tip" size={24} color="#64CA96E5" />
        </Animated.View>

        {/* Content */}
        <ScrollView className="px-4 mt-2 mb-10">
            {/* Section 1 */}
            <Animated.View
            style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            className="bg-white p-6 rounded-xl shadow-lg mt-10"
            >
            <View className="flex-row items-center">
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
            </Animated.View>

            {/* Section 2 */}
            <Animated.View
            style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            className="bg-white p-6 rounded-xl shadow-lg mt-10"
            >
            <View className="flex-row items-center">
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
            </Animated.View>

            {/* Section 3 */}
            <Animated.View
            style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            className="bg-white p-6 rounded-xl shadow-lg mt-10"
            >
            <View className="flex-row items-center">
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
            </Animated.View>

            {/* Section 4 */}
            <Animated.View
            style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            className="bg-white p-6 rounded-xl shadow-lg mt-10"
            >
            <View className="flex-row items-center">
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
            </Animated.View>

            {/* Section 5 */}
            <Animated.View
            style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
            className="bg-white p-6 rounded-xl shadow-lg mt-10 mb-10"
            >
            <View className="flex-row items-center">
                <MaterialIcons name="update" size={24} color="#64CA96" />
                <Text className="text-lg font-bold text-gray-800 ml-2">
                Changes to This Policy
                </Text>
            </View>
            <Text className="text-gray-700 mt-2">
                We may update this policy from time to time. You will be notified of any significant changes via email or in-app notifications.
            </Text>
            </Animated.View>
        </ScrollView>
        </LinearGradient>
    );
    }