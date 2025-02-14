import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaterialIcons } from "@expo/vector-icons";


export default function SignedUp() {
    const router = useRouter();
    const [checked, setChecked] = React.useState(false);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', padding: 20, backgroundColor: 'white' }}>
            <View>
                <Stack.Screen options={{ headerShown: false }} />
                {/* Back Button */}
                <TouchableOpacity 
                    onPress={() => router.push('/SignUp')} 
                    style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#64CA96E5', justifyContent: 'center', alignItems: 'center' }}
                >
                    <MaterialIcons name="arrow-left" size={24} color="white" />
                </TouchableOpacity>

                {/* Logo */}
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Image
                        source={require('../assets/images/loginBear.png')}
                        style={{ width: 150, height: 150, resizeMode: 'contain' }}
                    />
                </View>

                {/* Title */}
                <Text style={{ color: 'rgba(45, 204, 112, 1)', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
                    Create Your Account
                </Text>

                {/* Input Fields */}
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
                        <TextInput placeholder="Name" style={{ flex: 1, fontSize: 16 }} />
                        <Text style={{ color: 'green', fontSize: 16 }}>✓</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
                        <TextInput placeholder="Email" style={{ flex: 1, fontSize: 16 }} />
                        <Text style={{ color: 'green', fontSize: 16 }}>✓</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
                        <TextInput placeholder="Password" style={{ flex: 1, fontSize: 16 }} secureTextEntry />
                        <View>
                            <Image source={require("../assets/images/Vector.png")} resizeMode="contain" />
                        </View>
                    </View>
                </View>

                {/* Privacy Policy */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ color: 'gray', fontSize: 14 }}>I have read the </Text>
                    <Text onPress={() => router.push('/Privacy')} style={{ color: 'green', fontSize: 14, textDecorationLine: 'underline'}}>privacy policy</Text>
                    <Text style={{ color: 'gray', fontSize: 14, marginRight: 4 }}>.</Text>
                    <BouncyCheckbox
                        size={14}
                        fillColor="green"
                        iconStyle={{
                            borderColor: "green",
                            borderRadius: 2, 
                            borderWidth: 2,
                            width: 15, 
                            height: 15,}}
                            innerIconStyle={{
                            borderWidth: 2,
                            borderRadius: 1,
                            }}
                        onPress={(isChecked) => setChecked(isChecked)}/>
                </View>
                
                {/* Sign Up Button */}
                <TouchableOpacity 
                    style={{ backgroundColor: 'darkgreen', paddingVertical: 12, borderRadius: 30, alignItems: 'center', alignSelf: 'center', width: 374, marginTop: 5 }}
                    onPress={() => router.push('/SignIn')}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
