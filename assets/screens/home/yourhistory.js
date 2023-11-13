import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import HistoryBox from '../../components/historybox'

const YourHistory = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.boxContainer}>
            <HistoryBox style={styles.box}/>
            <HistoryBox style={styles.box}/>
            <HistoryBox style={styles.box}/>
            <HistoryBox style={styles.box}/>
            <HistoryBox style={styles.box}/>
            <HistoryBox style={styles.box}/>
            <HistoryBox style={styles.box}/>
            <HistoryBox style={styles.box}/>
            <HistoryBox style={styles.box}/>
            <HistoryBox style={styles.box}/>
            <HistoryBox style={styles.box}/>
            <HistoryBox style={styles.box}/>
        </View>
      </ScrollView>
    )
  }
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      boxContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 80,
        gap: 20,
      },

  })
  
  export default YourHistory;