import React, { useState } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationIndependentTree } from "@react-navigation/native";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Welcome from "./Welcome";
import Categories from "./Categories";
import Products from "./Products";
import Cart from "./Cart";
import Transactions from "./Transactions";
import PayWithCard from "./PayWithCard";
import MyOrders from "./MyOrders";
import Terms from "./Terms";
import Privacy from "./Privacy";
import Item from "./Item";
import Help from "./Help";
import Feedback from "./Feedback";
import AboutUs from "./AboutUs";
import Settings from "./Settings";
import EditProfile from "./EditProfile";
import Account from "./Account";
import withAuth from "./withAuth";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
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
          <Stack.Screen name="Account" component={withAuth(Account)} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
