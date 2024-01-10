import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/routes';
import BottomTabNavigator from './BottomTabNavigator';
import Login from '../screens/auth/login';
import Getstarted from '../screens/auth/getstarted';
import Signup from '../screens/auth/signup';
import ForgotPass from '../screens/home/forgotpass';
import Otp from '../screens/home/otp';
import ChangePassword from '../screens/home/changePassword';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkUserIdAndNavigate();
  }, []);

  const checkUserIdAndNavigate = async () => {
    const storedUserId = await AsyncStorage.getItem('user_id');

    if (storedUserId) {
      navigation.navigate(ROUTES.HOME_NAVIGATOR);
    } else {
      navigation.navigate(ROUTES.GETSTARTED);
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.GETSTARTED} component={Getstarted} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.SIGNUP} component={Signup} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPass} />
      <Stack.Screen name={ROUTES.OTP} component={Otp} />
      <Stack.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={ROUTES.HOME_NAVIGATOR} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;