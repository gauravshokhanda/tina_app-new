import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import userReducer, { loadUser } from "../components/Users/userReducer";
import cartReducer from "../components/Cart/cartReducer";
import productReducer from "../components/Products/productReducer";
import paymentReducer from "../components/Payments/paymentReducer"; 
import orderReducer from "../components/Orders/orderReducer";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Persist Config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart", "user", "products", "payment", "order"],
};

// Combine Reducers
export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  products: productReducer,
  payment: paymentReducer,
  order: orderReducer,
});

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


const loadStoredUser = async () => {
  const userData = await AsyncStorage.getItem("user");
  if (userData) {
    const parsedUser = JSON.parse(userData);
    setTimeout(() => {
      store.dispatch(loadUser()); 
    }, 0);
  }
};

loadStoredUser(); 

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
