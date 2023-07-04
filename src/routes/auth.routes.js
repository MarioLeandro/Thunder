import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';

const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
