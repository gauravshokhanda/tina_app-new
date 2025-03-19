import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserState {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    profileImage: string | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    profileImage: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.address = action.payload.address;
            state.profileImage = action.payload.profileImage;
            state.isLoggedIn = true;

            // Save user data to AsyncStorage
            AsyncStorage.setItem("user", JSON.stringify(action.payload));
        },

        updateProfile: (state, action: PayloadAction<{ name: string; profileImage: string | null }>) => {
            state.name = action.payload.name;
            state.profileImage = action.payload.profileImage;

            // Update AsyncStorage
            AsyncStorage.setItem("user", JSON.stringify(state));
        },

        clearUser: (state) => {
            state.name = "";
            state.email = "";
            state.phoneNumber = "";
            state.address = "";
            state.profileImage = null;
            state.isLoggedIn = false;

            // Remove user data from AsyncStorage
            AsyncStorage.removeItem("user");
        },

        loadUser: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.address = action.payload.address;
            state.profileImage = action.payload.profileImage;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});

export const { setUser, updateProfile, clearUser, loadUser } = userSlice.actions;
export default userSlice.reducer;