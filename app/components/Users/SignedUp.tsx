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
        // Trim inputs to avoid whitespace issues
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Validate privacy policy checkbox
        if (!checked) {
        Alert.alert("Error", "Please accept the privacy policy.");
        return;
        }

        // Validate all fields are filled
        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
        Alert.alert("Error", "All fields are required.");
        return;
        }

        setLoading(true);

        try {
        // Prepare payload 
        const payload = {
            username: trimmedName, 
            email: trimmedEmail,
            password: trimmedPassword,
        };
        //console.log("Sending data to API:", payload); 

        const response = await Client.signup(payload);
        //console.log("Signup Success:", response.data);

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
        contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            padding: 20,
            backgroundColor: "white",
        }}
        >
        <View>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Back Button */}
            <TouchableOpacity
            onPress={() => router.push("./SignUp")}
            style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#64CA96E5",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            <MaterialIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>

            {/* Logo */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Image
                source={require("../../../assets/images/loginBear.png")}
                style={{ width: 150, height: 150, resizeMode: "contain" }}
            />
            </View>

            {/* Title */}
            <Text
            style={{
                color: "rgba(45, 204, 112, 1)",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 20,
            }}
            >
            Create Your Account
            </Text>

            {/* Input Fields */}
            <View>
            <TextInput
                placeholder="Name"
                style={{
                marginBottom: 15,
                padding: 10,
                backgroundColor: "#f0f0f0",
                borderRadius: 10,
                fontSize: 16,
                }}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
            />
            <TextInput
                placeholder="Email"
                style={{
                marginBottom: 15,
                padding: 10,
                backgroundColor: "#f0f0f0",
                borderRadius: 10,
                fontSize: 16,
                }}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                style={{
                marginBottom: 15,
                padding: 10,
                backgroundColor: "#f0f0f0",
                borderRadius: 10,
                fontSize: 16,
                }}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            />
            </View>

            {/* Privacy Policy */}
            <View
            style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
            >
            <Text style={{ color: "gray", fontSize: 14 }}>I have read the </Text>
            <Text
                onPress={() => router.push({
                    pathname: '/Screens/Privacy',
                    params: { from: "SignedUp" }
                })}
                style={{
                color: "green",
                fontSize: 14,
                textDecorationLine: "underline",
                }}
            >
                privacy policy
            </Text>
            <Text style={{ color: "gray", fontSize: 14, marginRight: 4 }}>.</Text>
            <BouncyCheckbox
                size={14}
                fillColor="green"
                iconStyle={{
                borderColor: "green",
                borderRadius: 2,
                borderWidth: 2,
                width: 15,
                height: 15,
                }}
                innerIconStyle={{ borderWidth: 2, borderRadius: 1 }}
                onPress={(isChecked) => {
                // console.log("Checkbox checked:", isChecked); 
                setChecked(isChecked);
                }}
            />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
            style={{
                backgroundColor: "darkgreen",
                paddingVertical: 12,
                borderRadius: 30,
                alignItems: "center",
                alignSelf: "center",
                width: 374,
                marginTop: 5,
                opacity: loading ? 0.5 : 1,
            }}
            onPress={handleSignup}
            disabled={loading}
            >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                {loading ? "Signing Up..." : "Sign Up"}
            </Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
    }