import React, { useState } from "react";
import { View, Text, ScrollView,TouchableOpacity, TextInput, Image } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
const router = useRouter();
const [fullName, setFullName] = useState("Manish Sirohi");
const [email, setEmail] = useState("youremail@domain.com");
const [phoneNumber, setPhoneNumber] = useState("");
const [country, setCountry] = useState("IN");
const [gender, setGender] = useState("Male");
const [address, setAddress] = useState("45 New Avenue, New York");
const [profileImage, setProfileImage] = useState(null);

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
};

const countries = [
    { label: "🇮🇳 India (+91)", value: "IN", dialCode: "+91" },
    { label: "🇺🇸 United States (+1)", value: "US", dialCode: "+1" },
    { label: "🇬🇧 United Kingdom (+44)", value: "UK", dialCode: "+44" },
    { label: "🇦🇺 Australia (+61)", value: "AU", dialCode: "+61" },
    { label: "🇨🇦 Canada (+1)", value: "CA", dialCode: "+1" },
    { label: "🇩🇪 Germany (+49)", value: "DE", dialCode: "+49" },
    { label: "🇫🇷 France (+33)", value: "FR", dialCode: "+33" },
    { label: "🇯🇵 Japan (+81)", value: "JP", dialCode: "+81" },
    { label: "🇧🇷 Brazil (+55)", value: "BR", dialCode: "+55" },
];

  // Gender options
const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
];

return (
    <View className="flex-1 bg-[#E6F2ED]">
    <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
    <View className="flex-row items-center justify-between px-4 mt-6">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
        <MaterialIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
        Edit <Text className="text-green-600">Profile</Text>
        </Text>
        <MaterialIcons name="person-outline" size={24} color="#64CA96E5" />
    </View>

      {/* Content */}
    <ScrollView className="px-4 mt-6 mb-20">
        {/* Profile Image */}
        <View className="items-center mb-4">
        <TouchableOpacity onPress={pickImage} className="w-24 h-24 rounded-full border-2 border-gray-300 overflow-hidden">
            {profileImage ? (
                <Image source={{ uri: profileImage }} className="w-full h-full" />
            ) : (
                <View className="w-full h-full bg-gray-200 flex items-center justify-center">
                <MaterialIcons name="camera-alt" size={32} color="gray" />
                </View>
            )}
        </TouchableOpacity>
        <Text className="text-sm text-gray-500 mt-2">Tap to change profile picture</Text>
        </View>
        {/* Full Name */}
        <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold text-gray-800 mb-2">Full Name</Text>
        <TextInput
            className="bg-gray-100 p-3 rounded-lg text-gray-800"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
        />
        </View>

        {/* Email */}
        <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold text-gray-800 mb-2">Email</Text>
        <TextInput
            className="bg-gray-100 p-3 rounded-lg text-gray-800"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
        />
        </View>

        {/* Country & Gender in One Row */}
        <View className="flex-row justify-between">
          {/* Country Dropdown */}
        <View className="bg-white p-2 rounded-lg shadow mb-4 w-[48%]">
            <Text className="text-lg font-bold text-gray-800 mb-2">Country</Text>
            <RNPickerSelect
            onValueChange={(value) => setCountry(value)}
            items={countries}
            value={country}
            placeholder={{ label: "Select your country", value: null }}
            style={{
                inputIOS: {
                fontSize: 14,
                color: "black",
                paddingVertical: 8,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                },
                inputAndroid: {
                fontSize: 14,
                color: "black",
                paddingVertical: 8,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                },
            }}
            />
        </View>

          {/* Gender Dropdown */}
        <View className="bg-white p-2 rounded-lg shadow mb-4 w-[48%]">
            <Text className="text-lg font-bold text-gray-800 mb-2">Gender</Text>
            <RNPickerSelect
            onValueChange={(value) => setGender(value)}
            items={genders}
            value={gender}
            placeholder={{ label: "Select your gender", value: null }}
            style={{
                inputIOS: {
                fontSize: 14,
                color: "black",
                paddingVertical: 8,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                },
                inputAndroid: {
                fontSize: 14,
                color: "black",
                paddingVertical: 8,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                },
            }}
            />
        </View>
        </View>

        {/* Phone Number with Country Code */}
        <View className="bg-white p-2 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold text-gray-800 mb-2">Phone Number</Text>
        <PhoneInput
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            containerStyle={{ width: "100%", height: 60, backgroundColor: "#F3F3F3" }}
            textContainerStyle={{ backgroundColor: "#F3F3F3", paddingVertical: 8 }}
            textInputStyle={{ fontSize: 14 }}
            codeTextStyle={{ fontSize: 14 }}
        />
        </View>

        {/* Address */}
        <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold text-gray-800 mb-2">Address</Text>
        <TextInput
            className="bg-gray-100 p-3 rounded-lg text-gray-800"
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
        />
        </View>

        {/* Submit Button */}
        <TouchableOpacity className="bg-[#64CA96E5] p-4 rounded-lg items-center mt-6">
        <Text className="text-white font-bold">Submit</Text>
        </TouchableOpacity>
    </ScrollView>

      {/* Bottom Navigation Bar */}
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
    </View>
    </View>
);
}
