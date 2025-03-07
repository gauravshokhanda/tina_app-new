import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Animated, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ChatBot() {
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [inputText, setInputText] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isChatOpen ? 1 : 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [isChatOpen]);

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    const handleSend = () => {
        if (inputText.trim()) {
            setMessages((prev) => [...prev, { text: inputText, isUser: true }]);
            setInputText("");
            setIsTyping(true);

            setTimeout(() => {
                const response = getChatbotResponse(inputText);
                setMessages((prev) => [...prev, { text: response, isUser: false }]);
                setIsTyping(false);
            }, 1000);
        }
    };

    const getChatbotResponse = (message: string) => {
        const responses: { [key: string]: string } = {
            "hello": "Hello! How can I assist you today?",
            "help": "Sure, I can help you. What do you need assistance with?",
            "products": "We offer various waste management products including trash bags, recycling bins, and waste removal services.",
            "categories": "Our services include One-Time Pick-Ups, Weekly Removal Services, Junk Hauling, Trailer Rental, and Cabin Rental.",
            "pricing": "Our pricing varies based on the service type. Please specify which service you're interested in.",
            "contact": "You can reach us at https://appalachiantrashbgone.com/ or call us at 423-241-9489.",
            "locations": "We operate in multiple locations across the city. Please provide your zip code for availability.",
            "schedule": "You can schedule a pickup through our website or mobile app. Let me know if you need help!",
            "payment options": "We accept credit cards, PayPal, and direct bank transfers.",
            "refund policy": "Refunds are available within 7 days of purchase. Contact support for details.",
            "business hours": "Our customer service is available Monday to Friday from 8 AM to 6 PM.",
            "discounts": "We offer seasonal discounts and loyalty rewards. Stay updated on our website!",
            "waste disposal guidelines": "Ensure recyclables are clean and sorted. Hazardous waste requires special disposal methods.",
            "about us": "We are Appalachian Trash-B-Gone, a locally owned waste management company committed to providing affordable and efficient trash removal services. Our mission is to serve our community with integrity and ensure a cleaner environment for future generations.",
            "terms and conditions": "By using our services, you agree to our terms and conditions. This includes proper waste disposal practices, adherence to local regulations, account security, prohibited activities, and acceptance of potential service modifications. Violation of these terms may result in termination of services.",
            "privacy policy": "We take your privacy seriously. Your data is securely stored and never shared without consent. We collect and use data to improve user experience, enhance security, and comply with legal obligations. You have the right to access, modify, or delete your personal information upon request.",
            "how much does it cost": "The cost is determined by the volume of junk removed. You can visit our order page for our cost guidelines. An estimate, specific to your requirement, will be given at the time of service before any junk is removed. Exceptions to volume pricing include exceptionally weight material, such as concrete or landscape rocks or junk, which is in a difficult to reach location.",
            "how does it work": "The service is designed to be hassle-free. You can schedule a 3 hour service window on the day of your choice. Your Appalachian Trash-B-Gone representative will call you 20 minutes before arrival. Once at the location, the Appalachian Trash-B-Gone rep will take a look at your junk and give you the upfront cost. After that, you point to what you’d like removed.",
            "when should i set my trash out?": "Your trash should be set out the night before your service day or no later than 6:30 AM on your service day. We operate our truck from 7:00 AM to 7:00 PM Monday through Saturday.",
            "does my trash have to be in a container?": "No, but having it in a container is recommended. All trash must be bagged and tied in order to be collected.",
            "do you take cardboard": "Yes, break down ALL cardboard boxes and we will properly dispose of and/or recycle in an environmentally safe manner.",
            "do you offer any discounts for your trailer rental services?": "You can save by choosing our full day package for $125 + processing fees.",
            "do you dispose of firearms": "Due to liability, we do not dispose of firearms or ammo.",
            "what items do you not accept for trash removal?": "We do not accept hazardous waste, aerosol cans that are not empty, large glass panes, biomedical waste, construction/demolition waste, large tree debris, tires, compressed gas cylinders, stumps, paint, large engine parts, ammunition of any type, paint solvents, chemicals, small engine parts containing oil or fluids, treated wood, chemicals, dead animals or firearms.",
            "how much are additional days for junk hauling services?": "$20/Day",
            "is there a limit on how many tons in the packages?": "2 Ton Limit. $80/Ton after",
            "what is the total ton limit": "4 Ton Total Limit. (If your load exceeds 8,000 lbs you can be subject to removing the waste",
            "will you deliver the trailer for me?": "The dump trailer will be delivered to your door for however long you need it. Once filled, the trailer will be picked up and hauled away by our efficient crew to dispose of your junk in a safe and environmentally friendly manner",
            "what is the minimum number of hours i can rent the trailer for?": "4 hour minimum required"
        };
        return responses[message.toLowerCase()] || "Thanks for your message! How can I assist you?";
    };

    const chatHeight = animation.interpolate({ inputRange: [0, 1], outputRange: [0, 400] });

    return (
        <View className="flex-1 mt-[17%]">
            {/* Floating Chat Button */}
            <TouchableOpacity
                onPress={toggleChat}
                className="absolute bottom-5 right-5 bg-[#64CA96E5] p-4 rounded-full shadow-lg"
            >
                <MaterialIcons name="chat" size={28} color="white" />
            </TouchableOpacity>

            {/* Expandable Chat Window */}
            <Animated.View
                style={{ height: chatHeight }}
                className="absolute bottom-20 right-5 w-80 bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <ScrollView className="flex-1 p-4">
                    {messages.map((msg, index) => (
                        <View
                            key={index}
                            className={`flex-row ${msg.isUser ? "justify-end" : "justify-start"} mb-2`}
                        >
                            <View
                                className={`p-3 rounded-lg max-w-[75%] ${
                                    msg.isUser ? "bg-[#64CA96E5]" : "bg-gray-200"
                                }`}
                            >
                                <Text className={msg.isUser ? "text-white" : "text-gray-800"}>
                                    {msg.text}
                                </Text>
                            </View>
                        </View>
                    ))}
                    {isTyping && (
                        <View className="flex-row justify-start mt-2">
                            <Text className="text-gray-500 italic">Bot is typing...</Text>
                        </View>
                    )}
                </ScrollView>
                <View className="flex-row items-center p-3 border-t border-gray-300 bg-gray-100">
                    <TextInput
                        className="flex-1 bg-white p-2 rounded-lg border border-gray-300"
                        placeholder="Type a message..."
                        value={inputText}
                        onChangeText={setInputText}
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={handleSend} className="ml-2 p-3 bg-[#64CA96E5] rounded-full">
                        <MaterialIcons name="send" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}