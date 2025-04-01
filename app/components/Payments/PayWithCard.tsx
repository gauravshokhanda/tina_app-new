// PayWithCard.tsx
import React, { useState, useEffect, useRef, } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert ,SafeAreaView, Animated} from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentDetails } from "./paymentReducer";
import { addOrder } from "../Orders/orderReducer";
import { RootState } from "../../Services/store";

export default function PayWithCard() {
  const router = useRouter();
  const { totalAmount } = useLocalSearchParams();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const isMounted = useRef(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Set isMounted to true when component mounts, false when unmounts
  useEffect(() => {
    isMounted.current = true;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Function to format expiry date with auto "/"
  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, ""); 
    let formatted = cleaned;

    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    } else {
      formatted = cleaned;
    }

    setExpiryDate(formatted);
  };

  const handlePayNow = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert("Error", "Please fill in all card details.");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      Alert.alert("Error", "Please enter a valid 16-digit card number.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      Alert.alert("Error", "Please enter a valid expiry date in MM/YY format.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      Alert.alert("Error", "Please enter a valid 3-digit CVV.");
      return;
    }

    // Only proceed if component is mounted
    if (isMounted.current) {
      // Dispatch payment details to Redux store
      dispatch(setPaymentDetails({ cardNumber, expiryDate, cvv }));

      // Create order object
      const order = {
        orderId: "35325565555788",
        shippingAddress: "456 Creative Lane, San Francisco, CA 94102, United States",
        items: cart,
        orderDate: new Date().toISOString(),
        deliveryDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      };

      // Dispatch order to Redux store
      dispatch(addOrder(order));

      // Navigate to MyOrders page
      router.push("/components/Orders/MyOrders");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E6F2ED] px-4 py-6">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-[#64CA96E5]">
          <MaterialIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
          Pay with <Text className="text-green-600">Card</Text>
        </Text>
        <Ionicons name="card-outline" size={24} color="#64CA96E5" />
      </View>

      {/* Display Total Amount to Pay If need then add the display */}
      <View>
        
      </View>

      {/* Payment Methods */}
      <Text className="text-gray-900 text-lg text-center mb-3">Select Payment Method</Text>
      <View className="flex-row justify-center space-x-4 gap-3 mb-6">
        <FontAwesome name="cc-visa" size={40} color="#1A1F71" />
        <FontAwesome name="cc-mastercard" size={40} color="#F79E1B" />
        <FontAwesome name="cc-amex" size={40} color="#007BC1" />
        <FontAwesome name="cc-paypal" size={40} color="#003087" />
      </View>

      {/* Card Input Fields */}
      <Animated.View style={{ opacity: fadeAnim }} className="mx-4 bg-white p-6 rounded-2xl shadow-lg">
        <Text className="text-gray-700 font-medium mb-2">Card Number</Text>
        <View className="flex-row items-center border border-gray-200 p-3 rounded-xl mb-4 bg-gray-50">
          <MaterialIcons name="credit-card" size={24} color="#64CA96" />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
            maxLength={16}
          />
        </View>

        {/* Expiry Date */}
        <View className="flex-row justify-between">
          <View className="w-[48%]">
            <Text className="text-gray-700 font-medium mb-2">Expiry Date</Text>
            <View className="flex-row items-center border border-gray-200 p-3 rounded-xl bg-gray-50">
              <MaterialIcons name="date-range" size={24} color="#64CA96" />
              <TextInput
                className="flex-1 ml-3 text-gray-800"
                placeholder="MM/YY"
                keyboardType="numeric"
                value={expiryDate}
                onChangeText={formatExpiryDate}
                maxLength={5} 
                placeholderTextColor="#A0A0A0"
              />
            </View>
            {/*CVV Input Field*/ }
          </View>
          <View className="w-[48%]">
            <Text className="text-gray-700 font-medium mb-2">CVV</Text>
            <View className="flex-row items-center border border-gray-200 p-3 rounded-xl bg-gray-50">
              <MaterialIcons name="lock" size={24} color="#64CA96" />
              <TextInput
                className="flex-1 ml-3 text-gray-800"
                placeholder="***"
                keyboardType="numeric"
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
                maxLength={3}
                placeholderTextColor="#A0A0A0"
              />
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Other Payment Options */}
      <Text className="text-gray-700 text-base mt-6 mb-2">Other Payment Options</Text>
      <View className="bg-white p-4 rounded-lg shadow">
        <TouchableOpacity className="flex-row items-center justify-between p-3 border-b border-gray-300">
          <View className="flex-row items-center">
            <FontAwesome name="google-wallet" size={24} color="#EA4335" />
            <Text className="text-gray-700 ml-3">Google Pay</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-3 border-b border-gray-300">
          <View className="flex-row items-center">
            <FontAwesome name="apple" size={24} color="black" />
            <Text className="text-gray-700 ml-3">Apple Pay</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-3">
          <View className="flex-row items-center">
            <FontAwesome name="paypal" size={24} color="#003087" />
            <Text className="text-gray-700 ml-3">PayPal</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Pay Now Button */}
      <TouchableOpacity onPress={handlePayNow} className="bg-[#142d20e5] p-4 rounded-lg items-center mt-6 flex-row justify-center">
        <FontAwesome name="money" size={24} color="white" />
        <Text className="text-white font-bold ml-2">Pay Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}