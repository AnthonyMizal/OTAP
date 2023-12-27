import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors';

const OnboardingItem = ({item}) => {

  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}/>

      <View style={{flex: 0.}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: COLORS.primary,
    textAlign: 'center'
  },
  description: {
    fontWeight: '300',
    marginBottom: 10,
    color: COLORS.gray,
    paddingHorizontal: 64,
    textAlign: 'center'
  }
})