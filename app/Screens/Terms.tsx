import React from "react";
import { View, Text, ScrollView, TouchableOpacity,SafeAreaView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Terms() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      {/* Hide header */}
      <Stack.Screen options={{ headerShown: false }} />
      {/* Header with Icon */}
      <View className="items-center mb-8">
        <MaterialIcons name="description" size={48} color="#4CAF50" />
        <Text className="text-xl font-semibold text-gray-700">
                  Term and <Text className="text-green-600">Services</Text>
        </Text>
      </View>

      {/* Scrollable Terms and Conditions Text */}
      <ScrollView className="flex-1 mb-6">
        {/* Introduction */}
        <Text className="text-base text-gray-700 leading-7 mb-6">
          Welcome to Appalachian Trash-B-Gone! By using our app, you agree to the following terms and conditions:
        </Text>

        {/* Point 1 */}
        <View className="flex-row items-start mb-6">
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" className="mr-3" />
          <Text className="text-base text-gray-700 leading-7 flex-1">
            <Text className="text-green-600 font-bold">1. Acceptance of Terms:</Text> By accessing or using the app, you agree to be bound by these terms. If you do not agree, please do not use the app.
          </Text>
        </View>

        {/* Point 2 */}
        <View className="flex-row items-start mb-6">
          <MaterialIcons name="security" size={24} color="#4CAF50" className="mr-3" />
          <Text className="text-base text-gray-700 leading-7 flex-1">
            <Text className="text-green-600 font-bold">2. User Responsibilities:</Text> You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
          </Text>
        </View>

        {/* Point 3 */}
        <View className="flex-row items-start mb-6">
          <MaterialIcons name="privacy-tip" size={24} color="#4CAF50" className="mr-3" />
          <Text className="text-base text-gray-700 leading-7 flex-1">
            <Text className="text-green-600 font-bold">3. Privacy Policy:</Text> Your use of the app is also governed by our Privacy Policy.
          </Text>
        </View>

        {/* Point 4 */}
        <View className="flex-row items-start mb-6">
          <MaterialIcons name="block" size={24} color="#4CAF50" className="mr-3" />
          <Text className="text-base text-gray-700 leading-7 flex-1">
            <Text className="text-green-600 font-bold">4. Prohibited Activities:</Text> You may not use the app for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction.
          </Text>
        </View>

        {/* Point 5 */}
        <View className="flex-row items-start mb-6">
          <MaterialIcons name="cancel" size={24} color="#4CAF50" className="mr-3" />
          <Text className="text-base text-gray-700 leading-7 flex-1">
            <Text className="text-green-600 font-bold">5. Termination:</Text> We reserve the right to terminate or suspend your account at any time, without notice, for any reason.
          </Text>
        </View>

        {/* Point 6 */}
        <View className="flex-row items-start mb-6">
          <MaterialIcons name="edit" size={24} color="#4CAF50" className="mr-3" />
          <Text className="text-base text-gray-700 leading-7 flex-1">
            <Text className="text-green-600 font-bold">6. Changes to Terms:</Text> We may modify these terms at any time. Your continued use of the app after changes constitutes your acceptance of the new terms.
          </Text>
        </View>

        {/* Point 7 */}
        <View className="flex-row items-start mb-6">
          <MaterialIcons name="warning" size={24} color="#4CAF50" className="mr-3" />
          <Text className="text-base text-gray-700 leading-7 flex-1">
            <Text className="text-green-600 font-bold">7. Disclaimer:</Text> The app is provided "as is" without any warranties, express or implied. We are not responsible for any damages arising from your use of the app.
          </Text>
        </View>

        {/* Point 8 */}
        <View className="flex-row items-start mb-6">
          <MaterialIcons name="gavel" size={24} color="#4CAF50" className="mr-3" />
          <Text className="text-base text-gray-700 leading-7 flex-1">
            <Text className="text-green-600 font-bold">8. Governing Law:</Text> These terms are governed by the laws of the state of [Your State], without regard to its conflict of law provisions.
          </Text>
        </View>

        {/* Final Note */}
        <Text className="text-base text-gray-700 leading-7 mt-6">
          By accepting these terms, you acknowledge that you have read, understood, and agree to be bound by them.
        </Text>
      </ScrollView>

      {/* Accept Button with Icon */}
      <TouchableOpacity
        className="flex-row items-center justify-center bg-green-600 py-4 rounded-lg mt-6"
        onPress={() => router.push("/components/Users/SignIn")}
      >
        <MaterialIcons name="check-circle" size={24} color="white" />
        <Text className="text-white text-lg font-semibold ml-2">
          I Accept
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}