import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, FlatList, Animated } from 'react-native';
import {COLORS} from '../../constants/colors';
import {useFonts} from 'expo-font';
import { ROUTES } from '../../constants/routes';
import slide from '../../components/slide';
import OnboardingItem from '../../components/OnboardingItem';
import React, {useRef, useState} from 'react'
import Paginator from '../../components/Paginator';
import NextButton from '../../components/NextButton';
const Getstarted = (props) =>  {
  const {navigation} = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slide.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1})
    } else {
      return navigation.navigate(ROUTES.LOGIN);
    }
  }

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
        <TouchableOpacity style={{display: 'flex', width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 50, padding: 20}} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      <View style={{flex: 3}}>
        <FlatList data={slide} 
        renderItem={({item}) => <OnboardingItem item={item}/>}
        horizontal
        pagingEnabled
        bounces = {false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x : scrollX}}}], {useNativeDriver: false})}
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        />
      </View>

      <Paginator data={slide} scrollX={scrollX}/>
      <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slide.length)}/>
    </View>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  skipText:{
    fontFamily: 'CL-Bold',
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '800'
  }


});

export default Getstarted;