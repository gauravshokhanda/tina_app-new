    import React from "react";
    import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
    import { useRouter, Stack } from "expo-router";
    import { MaterialIcons } from "@expo/vector-icons";

    export default function AboutUs() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#E6F2ED]">
        <Stack.Screen options={{ headerShown: false }} />

        {/* Header */}
        <View className="flex-row items-center justify-between px-4 mt-6">
            <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 rounded-full bg-[#64CA96E5]"
            >
            <MaterialIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-700">
            About <Text className="text-green-600">Us</Text>
            </Text>
            <MaterialIcons name="more-horiz" size={24} color="gray" />
        </View>

        {/* Content */}
        <ScrollView className="px-4 mt-4 mb-20">
            {/* Banner Image */}
            <View className="mt-4">
            <Image
                source={require("../assets/images/about-us-banner.jpg")}
                className="w-full h-48 rounded-lg"
                resizeMode="cover"
            />
            </View>

            {/* Company Description */}
            <View className="mt-6 bg-white p-4 rounded-lg shadow">
            <View className="flex-row items-center">
                <MaterialIcons name="business" size={24} color="#4CAF50" />
                <Text className="text-lg font-bold text-gray-800 ml-2">
                About Appalachian Trash-B-Gone Company
                </Text>
            </View>
            <Text className="text-gray-700 mt-2">
                We offer a range of services, including options not commonly provided
                by other companies, such as online payment. While we prefer cans to
                be placed at the end of the driveway or curbside, we understand this
                may not always be possible, so we also offer off-curb pickups at an
                additional cost.
            </Text>
            <Text className="text-gray-700 mt-2">
                Appalachian Trash-B-Gone takes pride in being a locally owned and
                operated family business with a strong commitment to our community.
                By choosing our services, you support a local enterprise and ensure
                that your investment stays within the community. We appreciate the
                support of all our past and future customers and are dedicated to
                ensuring your satisfaction.
            </Text>
            <Text className="text-gray-700 mt-2">
                If you have any additional questions, please do not hesitate to
                contact us at any time. We look forward to serving you!
            </Text>
            </View>

            <View className="mt-4">
            <Image
                source={require("../assets/images/always-working-img.jpg")}
                className="w-full h-48 rounded-lg"
                resizeMode="cover"
            />
            </View>

            {/* Mission Statement */}
            <View className="mt-6 bg-white p-4 rounded-lg shadow">
            <View className="flex-row items-center">
                <MaterialIcons name="flag" size={24} color="#4CAF50" />
                <Text className="text-lg font-bold text-gray-800 ml-2">
                Mission Statement
                </Text>
            </View>
            <Text className="text-gray-700 mt-2">
                Our mission is to provide trash removal at the lowest cost possible
                with the best customer service. Being a family-owned and operated
                business allows us to keep our costs lower than our competitors. We
                take pride in our service and won’t leave our customers disappointed.
                We offer additional services that other trash removal companies
                don’t offer, including online payment options, text message alerts,
                and DOT certification. Our goal is to please our customers! We thank
                all of our past and future customers for supporting our local family
                business.
            </Text>
            <Text className="text-gray-700 mt-2">
                If you have additional questions, please don’t hesitate to call us
                anytime.
            </Text>
            </View>

            {/* Banner Image */}
            <View className="mb-2">
            <Image
                source={require("../assets/images/truck.png")}
                className="w-full h-50 rounded-lg"
                resizeMode="cover"
            />
            </View>

            {/* Services Offered */}
            <View className="mt-6 bg-white p-4 rounded-lg shadow">
            <View className="flex-row items-center">
                <MaterialIcons name="list-alt" size={24} color="#4CAF50" />
                <Text className="text-lg font-bold text-gray-800 ml-2">
                Services Offered
                </Text>
            </View>
            <View className="mt-2">
                {[
                "Residential and commercial weekly pick-ups.",
                "Billed automatically every month with an online subscription.",
                "Text message alerts before and after pick-ups.",
                "Picture texts for any overages, clean-ups, etc.",
                "Trash-B-Gone cleanouts for an added fee.",
                "Weekly, monthly, and quarterly cleanouts for an added fee.",
                "Trailer Rental",
                "Road Grading",
                ].map((service, index) => (
                <View key={index} className="flex-row items-center mt-2">
                    <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                    <Text className="text-gray-700 ml-2">{service}</Text>
                </View>
                ))}
            </View>
            </View>

            {/* Banner Image */}
            <View className="mt-4">
            <Image
                source={require("../assets/images/loginBear.png")}
                className="w-full h-58 rounded-lg"
                resizeMode="cover"
            />
            </View>

            {/* Rules */}
            <View className="mt-6 bg-white p-4 rounded-lg shadow">
            <View className="flex-row items-center">
                <MaterialIcons name="warning" size={24} color="#4CAF50" />
                <Text className="text-lg font-bold text-gray-800 ml-2">Rules</Text>
            </View>
            <Text className="text-gray-700 mt-2">
                These rules are in place to ensure the safety and well-being of the
                drivers, who have families they go home to every night. Trash is a
                dirty business and could pose a health threat to our drivers. To
                protect our drivers, equipment, and your property, please follow
                these rules:
            </Text>
            <View className="mt-2">
                {[
                "All bags must be tied, with no loose trash.",
                "Pet waste must be in a tied garbage bag.",
                "All boxes must be broken down.",
                "Garbage cans, bear boxes, or garbage bags must be easily accessible.",
                "If the cans are full of loose trash, it is the customer's responsibility.",
                ].map((rule, index) => (
                <View key={index} className="flex-row items-center mt-2">
                    <MaterialIcons name="error-outline" size={16} color="#4CAF50" />
                    <Text className="text-gray-700 ml-2">{rule}</Text>
                </View>
                ))}
            </View>
            </View>

            {/* Banner Image */}
            <View className="mt-4">
            <Image
                source={require("../assets/images/mountain.png")}
                className="w-full h-48 rounded-lg"
                resizeMode="cover"
            />
            </View>

            {/* Goals */}
            <View className="mt-6 bg-white p-4 rounded-lg shadow">
            <View className="flex-row items-center">
                <MaterialIcons name="star" size={24} color="#4CAF50" />
                <Text className="text-lg font-bold text-gray-800 ml-2">Goals</Text>
            </View>
            <View className="mt-2">
                {[
                "We want to preserve our beautiful mountains starting with vehicles that keep the junk in trucks and off the roads.",
                "The company aims to ground in their bare feet, zap trash, turn it into graphene, and eliminate waste.",
                "Use graphene for screens on TVs, cell phones, elevators, windows in high rises, oceanfront properties, and anywhere the glass or screen needs to be bulletproof.",
                "Use graphene to filter ocean water into fresh water.",
                "The company aims to ground in their bare feet, zap trash, turn it into graphene, and lower the amount of electronic waste.",
                "They want to use graphene for screens on TVs, cell phones, elevators, windows in high rises, oceanfront properties, and anywhere the glass or screen needs to be bulletproof.",
                ].map((goal, index) => (
                <View key={index} className="flex-row items-center mt-2">
                    <MaterialIcons name="error-outline" size={16} color="#4CAF50" />
                    <Text className="text-gray-700 ml-2">{goal}</Text>
                </View>
                ))}
            </View>
            </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View className="flex-row justify-around bg-[#64CA96E5] p-2 shadow absolute bottom-0 left-0 right-0 rounded-t-[20px]">
            <TouchableOpacity
            onPress={() => router.push("/Welcome")}
            className="items-center"
            >
            <MaterialIcons name="home" size={24} color="white" />
            <Text className="text-white text-xs">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => router.push("/Products")}
            className="items-center"
            >
            <MaterialIcons name="local-mall" size={24} color="white" />
            <Text className="text-white text-xs">Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => router.push('/Account')}
            className="items-center"
            >
            <MaterialIcons name="account-circle" size={24} color="white" />
            <Text className="text-white text-xs">Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => router.push("/Cart")}
            className="items-center"
            >
            <MaterialIcons name="shopping-cart" size={24} color="white" />
            <Text className="text-white text-xs">Cart</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    }