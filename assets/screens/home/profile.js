import { StyleSheet, Text, View, ToastAndroid,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/colors'
import Icon from 'react-native-vector-icons/Ionicons';
import {useFonts} from 'expo-font';
import { ROUTES } from '../../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
  const {navigation} = props;
  let [fontsLoaded] = useFonts({
    'Momcake-Bold': require('../../fonts/Momcake-Bold.otf'),
    'Momcake-Thin': require('../../fonts/Momcake-Thin.otf'),
    'CL-Reg': require('../../fonts/CL-Reg.ttf'),
    'CL-Bold': require('../../fonts/CL-Bold.ttf'),
    'Poppins-Black': require('../../fonts/Poppins-Black.ttf'),
    'Poppins-ExtraBold': require('../../fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Medium': require('../../fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../../fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../../fonts/Poppins-Thin.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

const logout = async () => {
  await AsyncStorage.removeItem('user_id');
  ToastAndroid.show('Logged out!', ToastAndroid.SHORT);
  return navigation.navigate(ROUTES.LOGIN);
};

  return (
    <View style={styles.container}>
       <View style={styles.header}>
            <Image style={styles.headinglogo} source={require('../../otapimages/header.png')} />
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress ={()=>navigation.navigate(ROUTES.EDIT_PROFILE)}>
          <View style={styles.content}>
                <Icon
                  name="person-circle"
                  size={34}
                  color={COLORS.primary}
                />
              <Text style={styles.text}>Edit your profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress = {logout}>
          <View style={styles.content}>
                <Icon
                  name="log-out"
                  size={34}
                  color={COLORS.primary}
                />
              <Text style={styles.text}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        width:"100%",
        alignItems: 'center',
        marginTop: 10,
        gap: 20
    },
    button: {
      padding: 20,
      width: '87%',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: COLORS.primary,
      backgroundColor: COLORS.white
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10
    },
    text: {
      fontFamily: 'CL-Bold',
      fontSize: 17,
      color: '#C19A6B'
    },
    header: {
      padding: 14,
      marginTop: 30,
      alignItems: 'flex-start'
    },
    headinglogo: {
      width: 230,
      height: 42,
      borderWidth: 2,
    },
   
})

export default Profile;