import { StyleSheet, View, TouchableOpacity, Animated} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import Svg, {G, Circle} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Fontisto';
import { COLORS } from '../constants/colors';


const NextButton = ({percentage, scrollTo}) => {

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={scrollTo}>
            <Icon
            name= 'arrow-right-l'
            size={40}
            color={COLORS.white}
            />
      </TouchableOpacity>
    </View>
  )
}

export default NextButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
    button: {
        position: 'absolute',
        backgroundColor: COLORS.primary,
        borderRadius: 100,
        paddingHorizontal: 25,
        paddingVertical: 25
    }
})