import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { setUser } from "./userReducer";
import type { AppDispatch } from "./store";

function SignupScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignUp = async () => {
    const newUser = {
      name: "New User",
      email: "newuser@example.com",
      phoneNumber: "9876543210",
      address: "456 Elm St",
      isLoggedIn: true,
      profileImage: "", 
    };

    dispatch(setUser(newUser));

    router.push("/SignIn");
  };

  return (
    <View className="flex-1 bg-white px-6">
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 bg-white">
        <View className="bg-green-500 h-3/5 w-full rounded-b-[60px] items-center justify-center relative mt-5">
          <Image
            source={require("../assets/images/loginBear.png")}
            className="w-70 h-70 mt-3"
            resizeMode="contain"
          />
          <Text className="text-white text-xl font-bold mt-2">Appalachian</Text>
          <Text className="text-white text-xl font-bold">Trash-B-Gone</Text>
        </View>

        <View className="flex-1 w-full px-6 mt-10">
          <TouchableOpacity onPress={() => router.push('/SignIn')} className="bg-green-900 p-4 rounded-full items-center">
            <Text className="text-white text-lg font-semibold">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignUp} className="border border-green-500 p-4 rounded-full items-center mt-4">
            <Text className="text-green-500 text-lg font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function SignUp() {
  return (
    <Provider store={store}>
      <SignupScreen />
    </Provider>
  );
}
