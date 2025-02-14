import React from "react";
import { View, Text, TouchableOpacity } from "react-native"; 
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useRouter } from "expo-router"; 
import { MaterialIcons } from "@expo/vector-icons"; 

const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const { isLoggedIn } = useSelector((state: RootState) => state.user);
        const router = useRouter(); 

        if (!isLoggedIn) {
        return (
            <View className="flex-1 bg-[#E6F2ED] justify-center items-center">
            <Text className="text-2xl font-semibold text-gray-700">
                Please log in to access this page
            </Text>
            <TouchableOpacity
                onPress={() => router.push("/SignIn")}
                className="bg-black py-3 px-6 rounded-lg flex-row items-center justify-center mt-8"
            >
                <MaterialIcons name="exit-to-app" size={22} color="white" />
                <Text className="text-white font-semibold ml-2 text-lg">
                Log In
                </Text>
            </TouchableOpacity>
            </View>
        );
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
