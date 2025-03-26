import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, FlatList,SafeAreaView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import I18n from 'i18n-js';
export default function Settings() {
  const router = useRouter();
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    { label: "English", value: "English", icon: "language" },
    { label: "हिन्दी", value: "Hindi", icon: "language" },
    { label: "Español", value: "Spanish", icon: "globe" },
    { label: "Français", value: "French", icon: "globe-europe" },
    { label: "Deutsch", value: "German", icon: "globe" },
    { label: "中文", value: "Chinese", icon: "globe-asia" },
    { label: "日本語", value: "Japanese", icon: "globe" },
    { label: "한국어", value: "Korean", icon: "globe-asia" },
    { label: "Português", value: "Portuguese", icon: "globe" },
    { label: "русский", value: "Russian", icon: "globe" },
    { label: "عربى", value: "Arabic", icon: "globe" },
    { label: "Italiano", value: "Italian", icon: "globe" },
    { label: "বাংলা", value: "Bengali", icon: "language" },
    { label: "Türkçe", value: "Turkish", icon: "globe" },
    { label: "Nederlands", value: "Dutch", icon: "globe" },
    { label: "Polski", value: "Polish", icon: "globe" },
    { label: "فارسی", value: "Persian", icon: "globe" },
    { label: "Svenska", value: "Swedish", icon: "globe" },
    { label: "ภาษาไทย", value: "Thai", icon: "globe" },
    { label: "Tiếng Việt", value: "Vietnamese", icon: "globe" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#E6F2ED]">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Background Image */}
      <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
        <Image
          source={require('../../assets/images/dustbin.png')}
          className="w-90 h-90 opacity-100"
          resizeMode="contain"
        />
      </View>

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mt-6">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
          <MaterialIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
          Account <Text className="text-green-600">Settings</Text>
        </Text>
        <MaterialIcons name="settings" size={24} color="#64CA96E5" />
      </View>

      {/* User Info */}
      <View className="items-center mt-6">
        <Image
          source={require('../../assets/images/loginBear.png')}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-xl font-bold mt-2">Manish Sirohi</Text>
        <Text className="text-gray-600">manishsirohi023@gmail.com</Text>
        <Text className="text-gray-600">+91-9568259784</Text>
      </View>

      {/* Settings Options */}
      <ScrollView className="px-4 mt-6 mb-20">
        {/* Edit Profile Information */}
        <TouchableOpacity onPress={() => router.push('/components/Users/EditProfile')} className="flex-row items-center justify-between py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <MaterialIcons name="edit" size={24} color="#4CAF50" />
            <Text className="text-lg text-gray-800 ml-2 p-2">Edit profile information</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>

        {/* Language Selection */}
        <TouchableOpacity
          onPress={() => setLanguageModalVisible(true)}
          className="flex-row items-center justify-between py-4 border-b border-gray-200"
        >
          <View className="flex-row items-center">
            <MaterialIcons name="language" size={24} color="#4CAF50" />
            <Text className="text-lg text-gray-800 ml-2 p-2">Language</Text>
          </View>
          <Text className="text-gray-600">{selectedLanguage}</Text>
        </TouchableOpacity>

        {/* Help & Support */}
        <TouchableOpacity onPress={() => router.push('/components/Feedback/Help')} className="flex-row items-center justify-between py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <MaterialIcons name="help-outline" size={24} color="#4CAF50" />
            <Text className="text-lg text-gray-800 ml-2 p-2">Help & Support</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>

        {/* Privacy Policy */}
        <TouchableOpacity onPress={() => router.push('/Screens/Privacy')} className="flex-row items-center justify-between py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <MaterialIcons name="privacy-tip" size={24} color="#4CAF50" />
            <Text className="text-lg text-gray-800 ml-2 p-2">Privacy Policy</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row justify-around bg-[#64CA96E5] p-2 shadow absolute bottom-0 left-0 right-0 rounded-t-[20px]">
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

      {/* Language Modal */}
      <Modal
        visible={isLanguageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black opacity-90">
          <View className="bg-white rounded-t-lg p-4">
            <Text className="text-xl font-bold mb-4">Select Language</Text>
            <FlatList
              data={languages}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLanguage(item.label);
                    setLanguageModalVisible(false);
                  }}
                  className="flex-row items-center justify-between py-4 border-b border-gray-200"
                >
                  <View className="flex-row items-center">
                    <MaterialIcons name={"language"} size={24} color="#4CAF50" />
                    <Text className="text-lg text-gray-800 ml-2">{item.label}</Text>
                  </View>
                  {selectedLanguage === item.label && (
                    <MaterialIcons name="check" size={24} color="green" />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.value}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
    