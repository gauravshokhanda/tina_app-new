import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch, RootState } from "../../Services/store";
import store from "../../Services/store";

interface UserState {
    token: string;            
    user_display_name: string;
    user_email: string;        
    user_nicename: string;     
    name: string;              
    phoneNumber: string;
    address: string;
    profileImage: string | null;
    isLoggedIn: boolean;
  }

  const initialState: UserState = {
    token: "",
    user_display_name: "",
    user_email: "",
    user_nicename: "",
    name: "",
    phoneNumber: "",
    address: "",
    profileImage: null,
    isLoggedIn: false,
  };
  

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<UserState>) => {
      return { ...action.payload, isLoggedIn: true };
    },

    updateProfileState: (
      state,
      action: PayloadAction<{ name: string; profileImage: string | null }>
    ) => {
      state.name = action.payload.name;
      state.profileImage = action.payload.profileImage;
    },

    clearUserState: (state) => {
      return initialState;
    },

    loadUserState: (state, action: PayloadAction<UserState>) => {
      return { ...action.payload };
    },
  },
});

export const {
  setUserState,
  updateProfileState,
  clearUserState,
  loadUserState,
} = userSlice.actions;

// Async Thunks with correct types
export const setUser =
  (userData: UserState) => async (dispatch: AppDispatch) => {
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    dispatch(setUserState(userData));
  };

export const updateProfile =
  (updatedData: { name: string; profileImage: string | null }) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const currentState = getState().user;
    const newUserData = { ...currentState, ...updatedData };
    console.log("UpdateProfile data in Redux:", updateProfile);

    await AsyncStorage.setItem("user", JSON.stringify(newUserData));
    dispatch(updateProfileState(updatedData));
  };

export const clearUser = () => async (dispatch: AppDispatch) => {
  await AsyncStorage.removeItem("user");
  dispatch(clearUserState());
};

export const loadUser = () => async (dispatch: AppDispatch) => {
  const userData = await AsyncStorage.getItem("user");

  if (userData) {
    dispatch(loadUserState(JSON.parse(userData)));
  }
};

// Export reducer
export default userSlice.reducer;
