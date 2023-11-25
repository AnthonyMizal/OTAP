import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import React, { useState, useEffect} from 'react';
import HistoryBox from '../../components/historybox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../constants/url';
import { useFocusEffect } from "@react-navigation/native";
const YourHistory = () => {
  const [historyData, setHistoryData] = useState([]);

  const fetchData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('user_id');
      const response = await axios.get(`${baseUrl}emergency/${storedUserId}`); // Replace with your actual API endpoint
      console.log(response.data.history);
      setHistoryData(response.data.history);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
        fetchData();
      };
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headinglogo} source={require('../../otapimages/header.png')} />
      </View>
      <View style={styles.boxContainer}>
        
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HistoryBox data={item} />}
      />
          
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 120,
  },
  boxContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginBottom: 80
  },
  header: {
    padding: 14,
    marginTop: 30,
    alignItems: 'flex-start',
  },
  headinglogo: {
    width: 230,
    height: 42,
    borderWidth: 2,
  },
});

export default YourHistory;