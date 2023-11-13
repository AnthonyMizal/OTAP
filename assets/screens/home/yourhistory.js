import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import HistoryBox from '../../components/historybox'

const YourHistory = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Image style={styles.headinglogo} source={require('../../otapimages/header.png')} />
        </View>
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
        marginTop: 10,
        gap: 20,
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
  
  export default YourHistory;