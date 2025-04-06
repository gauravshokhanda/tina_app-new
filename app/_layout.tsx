import "../global.css";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Services/store";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import TabsLayout from "./tabs/_layout";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#E3F8F3" }}>
          <TabsLayout />
          <Toast />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}