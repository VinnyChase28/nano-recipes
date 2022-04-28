import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import RecipesCategoriesScreen from "../screens/Categories";
import RecipesByCategoryScreen from "../screens/RecipesByCategory";
import RecipesByChefScreen from "../screens/RecipesByChef";
import RecipeDetailsScreen from "../screens/RecipeDetails";
import ChefsScreen from "../screens/Chefs";
import SearchScreen from "../screens/Search";
import FavoritesScreen from "../screens/Favorites";
import LogoutScreen from "../screens/Logout";
import SettingsScreen from "../screens/Settings";
import TermsScreen from "../screens/Terms";
import AboutUsScreen from "../screens/AboutUs";
import ContactUsScreen from "../screens/ContactUs";
import VideoPlayerScreen from "../screens/VideoPlayer";

var styles = require("../../assets/files/Styles");

const Stack = createStackNavigator();

export default function Logged(props) {
  const { navigation } = props;

  const navigationOptions = {
    headerStyle: styles.headerStyle,
    headerBackTitle: null,
    headerTintColor: "#fff",
    headerTitleAlign: "center",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      justifyContent: "space-between",
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
    },
    headerBackTitleVisible: false,
  };

  const buttonLeft = () => {
    return (
      <Ionicons
        name={"md-arrow-back"}
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.arrowbackicon}
      />
    );
  };

  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipesCategoriesScreen"
        component={RecipesCategoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipesByCategoryScreen"
        component={RecipesByCategoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipesByChefScreen"
        component={RecipesByChefScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeDetailsScreen"
        component={RecipeDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChefsScreen"
        component={ChefsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LogoutScreen"
        component={LogoutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactUsScreen"
        component={ContactUsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoPlayerScreen"
        component={VideoPlayerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
