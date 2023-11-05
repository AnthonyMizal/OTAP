import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {COLORS} from './assets/constants/colors';
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from './assets/navigator/AuthNavigator';



export default function App() {

    return (
      <NavigationContainer>
        <StatusBar translucent={true}></StatusBar>
        <AuthNavigator/>
     </NavigationContainer>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    opacity: 20
  },
  bgimage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: 330,
    height: 200,
    borderRadius: 20,
    display: 'flex',
  },
  foodpng: {
    position: 'absolute',
    width: 500,
    height: 260,
    top: 60
  },
  personpng: {
    width: 75,
    height: 75,
  },
  wavepng: {
    position: 'absolute',
  },
  text1: {
    fontFamily: 'Momcake-Bold',
    fontSize: 22,
    color: COLORS.white
  },
  textWrapper: {
    paddingTop: 25,
    paddingLeft: 30,
    alignSelf: 'flex-start'
  },
  text2: {
    fontFamily: 'Momcake-Bold',
    color: COLORS.white,
    fontSize: 45
  },
  text3: {
    fontFamily: 'Momcake-Bold',
    color: COLORS.white,
    fontSize: 65
  },
  textWrapper2: {
    display: 'flex',
    width: 350,
    marginBottom: 100
  },
  getStartedBtn: {
    marginTop: 100,
    padding: 18,
    paddingHorizontal: 120,
    borderRadius: 30,
    borderColor: COLORS.white,
    borderWidth: 2
  },
  getStartedTxt: {
    color: COLORS.white,
    fontFamily: 'CL-Bold'
  }

});

