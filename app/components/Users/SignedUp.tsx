import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import Client from "../../Apis/client";

export default function SignedUp() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!checked) {
        Alert.alert("Error", "Please accept the privacy policy.");
        return;
        }

        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
        Alert.alert("Error", "All fields are required.");
        return;
        }

        setLoading(true);

        try {
        const payload = {
            username: trimmedName,
            email: trimmedEmail,
            password: trimmedPassword,
        };
        console.log("Sending data to API:", payload);

        const response = await Client.signup(payload);
        console.log("Signup Success:", response.data);

        if (response.data.success) {
            Alert.alert("Success", "Account created successfully!");
            router.push("./SignIn");
        } else {
            Alert.alert(
            "Error",
            response.data.message || "Signup response was empty."
            );
        }
        } catch (error) {
        } finally {
        setLoading(false);
        }
    };

    return (
        <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-gray-50 p-6"
        >
        <Stack.Screen options={{ headerShown: false }} />

        {/* Back Button */}
        <TouchableOpacity
            onPress={() => router.push("./SignUp")}
            className="w-12 h-12 rounded-full bg-[#64CA96] justify-center items-center shadow-md"
        >
            <MaterialIcons name="arrow-left" size={28} color="white" />
        </TouchableOpacity>

        {/* Logo */}
        <View className="items-center mt-6 mb-8">
            <Image
            source={require("../../../assets/images/loginBear.png")}
            className="w-40 h-40"
            resizeMode="contain"
            />
        </View>

        {/* Title */}
        <Text className="text-3xl font-extrabold text-center text-[#2DCC70] mb-8">
            Create Your Account
        </Text>

        {/* Input Fields */}
        <View className="space-y-5">
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <TextInput
                placeholder="Name"
                className="text-base text-gray-800"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                placeholderTextColor="#9CA3AF"
            />
            </View>
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mt-2">
            <TextInput
                placeholder="Email"
                className="text-base text-gray-800"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
            />
            </View>
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mt-2">
            <TextInput
                placeholder="Password"
                className="text-base text-gray-800"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
            />
            </View>
        </View>

        {/* Privacy Policy */}
        <View className="flex-row items-center mt-6 mb-8">
            <Text className="text-gray-600 text-sm">I agree to the </Text>
            <Text
            onPress={() => router.push("/Screens/Privacy")}
            className="text-[#2DCC70] text-sm font-medium underline"
            >
            Privacy Policy
            </Text>
            <Text className="text-gray-600 text-sm mr-2">.</Text>
            <BouncyCheckbox
            size={18}
            fillColor="#2DCC70"
            unFillColor="#FFFFFF"
            iconStyle={{
                borderColor: "#2DCC70",
                borderRadius: 4,
                borderWidth: 2,
            }}
            innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
            onPress={(isChecked) => setChecked(isChecked)}
            />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
            className={`bg-[#2DCC70] to-[#64CA96] py-4 rounded-full items-center shadow-lg ${
            loading ? "opacity-70" : "opacity-100"
            }`}
            onPress={handleSignup}
            disabled={loading}
        >
            <Text className="text-white text-lg font-semibold">
            {loading ? "Signing Up..." : "Sign Up"}
            </Text>
        </TouchableOpacity>

        {/* Footer Link */}
        <TouchableOpacity
            onPress={() => router.push("./SignIn")}
            className="mt-6 self-center"
        >
            <Text className="text-gray-600 text-lg">
            Already have an account?{" "}
            <Text className="text-[#2DCC70] font-medium">Sign In</Text>
            </Text>
        </TouchableOpacity>
        </ScrollView>
    );
}