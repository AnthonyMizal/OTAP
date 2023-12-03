import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ROUTES } from '../constants/routes';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/home/profile';
import EditProfile from '../screens/home/editprofile';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}
    initialRouteName={ROUTES.PROFILE}  >
        <Stack.Screen name={ROUTES.PROFILE} component={Profile}/>
        <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator

const styles = StyleSheet.create({})