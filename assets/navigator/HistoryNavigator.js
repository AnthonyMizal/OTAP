import { View, Text } from 'react-native'
import React from 'react'
import { ROUTES } from '../constants/routes';
import { createStackNavigator } from '@react-navigation/stack';
import YourHistory from '../screens/home/yourhistory';

const Stack = createStackNavigator();

const HistoryNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}
    initialRouteName={ROUTES.YOURHISTORY}  >
        <Stack.Screen name={ROUTES.YOURHISTORY} component={YourHistory}/>
        <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile}/>
    </Stack.Navigator>
  )
}

export default HistoryNavigator;