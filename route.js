// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screen/LoginScreen'
import RegisterScreen from './Screen/RegisterScreen'
import HomeScreen from './Screen/Components/HomeScreen'
import DetailMobil from './Screen/Components/DetailMobil'
import DataMobil from './Screen/Components/DataMobil'
import ListRental from './Screen/Components/ListRental'

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Detail" component={DetailMobil} />
            <Stack.Screen name="Mobil" component={DataMobil} />
            <Stack.Screen name="ListRental" component={ListRental} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;