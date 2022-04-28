import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from "../screens/Start";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import ForgetPassScreen from "../screens/ForgetPass";
import TermsGuestScreen from "../screens/TermsGuest";
import ColorsApp from '../utils/ColorsApp';

const Stack = createStackNavigator();

export default function StackNavigation(props){

	const navigatorOptions = {
		headerStyle: {
			backgroundColor: '#fff',
			shadowColor: 'transparent',
			elevation: 0,
			shadowOpacity: 0,
		},
		headerTitleStyle: {
			fontSize: 18,
			color: '#000'
		},
		headerTitleAlign: 'center',
		headerBackTitleVisible:false,
		headerTintColor: '#000'
	}

return (
	<Stack.Navigator screenOptions={navigatorOptions}>
	<Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }}/>
	<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
	<Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
	<Stack.Screen name="ForgetPass" component={ForgetPassScreen} options={{ headerShown: false }}/>
	<Stack.Screen name="Terms" component={TermsGuestScreen} options={{ headerShown: false }}/>
	</Stack.Navigator>
	)

}
