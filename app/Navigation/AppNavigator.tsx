import React, { useState } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationIndependentTree } from "@react-navigation/native";
import Home from "../Screens/Home";
import SignIn from "../components/Users/SignIn";
import SignUp from "../components/Users/SignUp";
import Welcome from "../Screens/Welcome";
import SignedUp from "../components/Users/SignedUp";
import Categories from "../constants/Categories";
import Products from "../components/Products/Products";
import Cart from "../components/Cart/Cart";
import Transactions from "../constants/Transactions";
import PayWithCard from "../components/Payments/PayWithCard";
import MyOrders from "../components/Orders/MyOrders";
import Terms from "../Screens/Terms";
import Privacy from "../Screens/Privacy";
import Item from "../constants/Item";
import Help from "../components/Feedback/Help";
import Feedback from "../components/Feedback/Feedback";
import AboutUs from "../Screens/AboutUs";
import Settings from "../Screens/Settings";
import EditProfile from "../components/Users/EditProfile";
import Account from "../Screens/Account";
import withAuth from "./withAuth";
import ContactSeller from "../components/Feedback/ContactSeller";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignedUp" component={SignedUp} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Transactions" component={Transactions} />
          <Stack.Screen name="PayWithCard" component={PayWithCard} />
          <Stack.Screen name="MyOrders" component={MyOrders} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="Item" component={Item} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ContactSeller" component={ContactSeller} />
          <Stack.Screen name="Account" component={withAuth(Account)} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
