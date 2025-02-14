// index.tsx
import React from "react";
import AppNavigator from "./AppNavigator";
import { Stack } from "expo-router";
export default function App() {
  return (
    <>
      <AppNavigator />
      <Stack.Screen options={{ headerShown: false }} />
    </>
  );
}