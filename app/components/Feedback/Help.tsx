// HelpSupport.tsx
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image,SafeAreaView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Help() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("FAQ");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqData = [
    {
      question: "How much does it cost?",
      answer: "The cost is determined by the volume of junk removed. You can visit our order page for our cost guidelines. An estimate, specific to your requirement, will be given at the time of service before any junk is removed. Exceptions to volume pricing include exceptionally weight material, such as concrete or landscape rocks or junk, which is in a difficult to reach location.",
    },
    {
      question: "How does it work?",
      answer: "The service is designed to be hassle-free. You can schedule a 3 hour service window on the day of your choice. Your Appalachian Trash-B-Gone representative will call you 20 minutes before arrival. Once at the location, the Appalachian Trash-B-Gone rep will take a look at your junk and give you the upfront cost. After that, you point to what you’d like removed.",
    },
    {
      question: "When Should I set my trash out?",
      answer: "Your trash should be set out the night before your service day or no later than 6:30 AM on your service day.  We operate our truck from 7:00 AM to 7:00 PM Monday through Saturday.",
    },
    {
      question: "Does my trash have to be in a container?",
      answer: "No, but having it in a container is recommended. All trash must be bagged and tied in order to be collected.",
    },
    {
      question: "Do you take a cardboard?",
      answer: "Yes, break down ALL cardboard boxes and we will properly dispose of and/or recycle in an environmentally safe manner.",
    },
    {
      question: "Do you offer any discounts for your trailer rental services?",
      answer: "You can save by choosing our full day package for $125 + processing fees.",
    },
    {
      question: "Do you dispose of fire arms?",
      answer: "Due to liability, we do not dispose of firearms or ammo.",
    },
    {
      question: "what items do not accept for trash removal?",
      answer: "We do not accept hazardous waste, aerosol cans that are not empty, large glass panes, biomedical waste, construction/demolition waste, large tree debris, tires, compressed gas cylinders, stumps, paint, large engine parts, ammunition of any type, paint solvents, chemicals, small engine parts containing oil or fluids, treated wood, chemicals, dead animals or firearms.",
    },
    {
      question: "How much are additional days for junk hauling services?",
      answer: "$20/Day",
    },
    {
      question: "Is there a limit on how many tons in the packages?",
      answer: "2 Ton Limit. $80/Ton after",
    },
    {
      question: "What is the total ton limit?",
      answer: "4 Ton Total Limit. (If your load exceeds 8,000 lbs you can be subject to removing the waste",
    },
    {
      question: "Will you deliver the trailer for me?",
      answer: "The dump trailer will be delivered to your door for however long you need it. Once filled, the trailer will be picked up and hauled away by our efficient crew to dispose of your junk in a safe and environmentally friendly manner",
    },
    {
      question: "What is the minimum number of hours I can rent the trailer for?",
      answer: "4 hour minimum required",
    },
  ];


  return (
    <SafeAreaView className="flex-1 bg-[#E6F2ED]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mt-6">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
          <MaterialIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
          Help & <Text className="text-green-600">Support</Text>
        </Text>
        <MaterialIcons name="support-agent" size={24} color="#64CA96E5" />
      </View>

      {/* FAQ and Contact Us Buttons */}
      <View className="flex-row justify-between px-4 mt-4">
        {/* FAQ Button */}
        <TouchableOpacity
          className={`flex-1 items-center p-2 rounded-lg ${activeTab === "FAQ" ? "bg-[#4CAF50]" : "bg-white"}`}
          onPress={() => setActiveTab("FAQ")}
        >
          <MaterialIcons name="help-outline" size={24} color={activeTab === "FAQ" ? "white" : "#4CAF50"} />
          <Text className={`text-sm mt-1 ${activeTab === "FAQ" ? "text-white" : "text-gray-800"}`}>FAQ</Text>
        </TouchableOpacity>

        {/* Contact Us Button */}
        <TouchableOpacity
          className={`flex-1 items-center p-2 rounded-lg ml-2 ${activeTab === "ContactUs" ? "bg-[#4CAF50]" : "bg-white"}`}
          onPress={() => setActiveTab("ContactUs")}
        >
          <MaterialIcons name="contact-support" size={24} color={activeTab === "ContactUs" ? "white" : "#4CAF50"} />
          <Text className={`text-sm mt-1 ${activeTab === "ContactUs" ? "text-white" : "text-gray-800"}`}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      {/* Content Based on Active Tab */}
      <ScrollView className="px-4 mt-4 mb-20">
        {activeTab === "FAQ" ? (
          // FAQ Content with Dropdowns
          <View>
            <Text className="text-lg font-bold text-gray-800 mt-7">Frequently Asked Questions</Text>
            <Text className="text-gray-700 mt-2">
              The app helps users manage their waste efficiently by tracking garbage levels in bins and setting reminders for garbage collection.
            </Text>

            {/* FAQ Dropdowns */}
            {faqData.map((faq, index) => (
              <View key={index} className="mt-4">
                <TouchableOpacity
                  className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow mt-3"
                  onPress={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <Text className="text-lg font-bold text-gray-800">{faq.question}</Text>
                  <MaterialIcons
                    name={expandedFAQ === index ? "expand-less" : "expand-more"}
                    size={24}
                    color="#4CAF50"
                  />
                </TouchableOpacity>
                {expandedFAQ === index && (
                  <View className="p-3 bg-gray-100 rounded-b-lg">
                    <Text className="text-gray-700">{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          // Contact Us Content in List Format
          <View>
            <Text className="text-xl font-bold text-gray-800 mt-5 text-center">Contact Us</Text>
            <Text className="text-gray-700 mt-2">
              If you have any questions or need assistance, please reach out to us through the following channels:
            </Text>

            {/* Customer Services List */}
            <View className="mt-4">
              <Text className="text-xl font-bold text-gray-800 mt-5">Customer Services</Text>
              <View className="mt-2">
                <View className="flex-row items-center p-3 bg-white rounded-lg shadow mt-2">
                  <MaterialIcons name="email" size={24} color="#4CAF50" />
                  <Text className="text-gray-700 ml-2">info@appalachianbgone.com</Text>
                </View>
                <View className="flex-row items-center p-3 bg-white rounded-lg shadow mt-2">
                  <MaterialIcons name="phone" size={24} color="#4CAF50" />
                  <Text className="text-gray-700 ml-2">423-241-9489</Text>
                </View>
              </View>
            </View>

            {/* Social Media List */}
            <View className="mt-4">
              <Text className="text-xl font-bold text-gray-800 mt-5">Social Media</Text>
              <View className="mt-2">
                <View className="flex-row items-center p-3 bg-white rounded-lg shadow mt-2">
                  <MaterialCommunityIcons name="whatsapp" size={24} color="#4CAF50" />
                  <Text className="text-gray-700 ml-2">WhatsApp: 423-241-9489</Text>
                </View>
                <View className="flex-row items-center p-3 bg-white rounded-lg shadow mt-2">
                  <MaterialCommunityIcons name="web" size={24} color="#4CAF50" />
                  <Text className="text-gray-700 ml-2">Website: https://appalachiantrashbgone.com/</Text>
                </View>
                <View className="flex-row items-center p-3 bg-white rounded-lg shadow mt-2">
                  <MaterialIcons name="facebook" size={24} color="#4CAF50" />
                  <Text className="text-gray-700 ml-2">Facebook: @example</Text>
                </View>
                <View className="flex-row items-center p-3 bg-white rounded-lg shadow mt-2">
                  <MaterialCommunityIcons name="twitter" size={24} color="#4CAF50" />
                  <Text className="text-gray-700 ml-2">Twitter: @example</Text>
                </View>
                <View className="flex-row items-center p-3 bg-white rounded-lg shadow mt-2">
                  <MaterialCommunityIcons name="instagram" size={24} color="#4CAF50" />
                  <Text className="text-gray-700 ml-2">Instagram: @example</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

    </SafeAreaView>
  );
}