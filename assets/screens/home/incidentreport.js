import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const IncidentReport = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>IncidentReport</Text>
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
        justifyContent: 'center',
        display: 'flex'
    }
  })
  
  export default IncidentReport;