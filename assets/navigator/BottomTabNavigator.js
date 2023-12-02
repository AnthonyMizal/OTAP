import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ROUTES} from '../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import Start from '../screens/home/start';
import YourLocation from '../screens/home/location';
import IncidentReport from '../screens/home/incidentreport';
import YourHistory from '../screens/home/yourhistory';
import Profile from '../screens/home/profile';
import ProfileNavigator from './ProfileNavigator';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    
    <Tab.Navigator
    screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#fff',
          height: 80,
          borderTopWidth: 0,
          position: 'absolute',
          bottom:15,
          borderRadius: 50
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen name={ROUTES.START} component={Start}
      options={{
        tabBarIcon: ({focused}) => (
          <View
            style={{
              top: Platform.OS === 'ios' ? 10 : 0,
            }}>
            <Icon
              name= 'md-home'
              size={30}
              color={focused ? '#D2AC76' : '#DDDDDD'}
            />
          </View>
        ),
      }}/>
      <Tab.Screen name={ROUTES.YOURLOCATION} component={YourLocation} options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="location-sharp"
                  size={30}
                  color={focused ? '#D2AC76' : '#DDDDDD'}
                />
                
              </View>

            ),
          }}/>
      <Tab.Screen name={ROUTES.INCIDENTREPORT} component={IncidentReport} options={{
          tabBarShowLabel: true,

            tabBarStyle: {
              display: "none",
            },
            tabBarIcon: ({focused}) => (
              focused?
              <Image style={{width:70, height:70,top: Platform.OS === 'ios' ? -0 : -30}} source={require('../otapimages/otaplogo.png')} /> : <Image style={{width:70, height:70,top: Platform.OS === 'ios' ? -0 : -30}} source={require('../otapimages/otaplogo.png')} />
            ) 
          }}/>
      <Tab.Screen name={ROUTES.YOURHISTORY} component={YourHistory} options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="ios-alert-circle"
                  size={30}
                  color={focused ? '#D2AC76' : '#DDDDDD'}
                />
              </View>
            ),
          }}/>
      <Tab.Screen name={ROUTES.PROFILENAVIGATOR} component={ProfileNavigator} options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="person"
                  size={30}
                  color={focused ? '#D2AC76' : '#DDDDDD'}
                />
              </View>
            ),
          }}/>
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;