import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {COLORS} from '../../constants/colors';
import {useFonts} from 'expo-font';
import { ROUTES } from '../../constants/routes';

const Getstarted = (props) =>  {
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

    return (
    <View style={styles.container}>
       <ImageBackground source={require('../../otapimages/bgstart.png')} resizeMode="cover" style={styles.bgimage}>
      <View style={styles.box}>
      <Image style={styles.personpng} source={require('../../otapimages/otaplogo.png')} />
      </View>
      <View style={styles.textWrapper2}>
        <Text style={styles.text2}>One-Tap</Text>
        <Text style={styles.text2}>Emergency</Text>
        <Text style={styles.text3}>Assistance</Text>
        <Text style={styles.text3}>Platform</Text>
      </View>

      <View style={styles.textWrapper}>
      </View>
      
      <TouchableOpacity style={styles.getStartedBtn} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
        <Text style={styles.getStartedTxt}>GET STARTED</Text>
      </TouchableOpacity>

      </ImageBackground>
    </View>
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

export default Getstarted;