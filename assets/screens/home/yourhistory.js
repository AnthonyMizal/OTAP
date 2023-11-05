import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const YourHistory = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>YourHistory</Text>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
        justifyContent: 'center'
      },
      text: {
        alignItems: 'center',
        justifyContent: 'center'
    }
  })
  
  export default YourHistory;