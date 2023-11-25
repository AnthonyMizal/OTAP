import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useState, useEffect} from 'react';
import HistoryBox from '../../components/historybox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../constants/url';
import { useFocusEffect } from "@react-navigation/native";
import echoInstance from '../../constants/laravelecho';
const YourHistory = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Log that the component is attempting to connect to the WebSocket server
    console.log('Attempting to connect to WebSocket server');
  
    // Bind a callback for the 'connected' event, which fires when the connection is established
    echoInstance.connector.pusher.connection.bind('connected', () => {
      // Log that the component is now connected to the WebSocket server
      console.log('Connected to WebSocket server');
    });
  
    // Bind a callback for the 'disconnected' event, which fires when the connection is lost
    echoInstance.connector.pusher.connection.bind('disconnected', () => {
      // Log that the component is disconnected from the WebSocket server
      console.log('Disconnected from WebSocket server');
    });
  
    // Listen for the 'incident-updated' event on the 'incident-channel'
    echoInstance.channel('incident-channel').listen('incident-updated', (event) => {
      // Log that an incident has been updated with the data from the event
      console.log('Incident updated:', event.incident);
    });
  
    // Clean up the subscription when the component is unmounted
    return () => {
      // Log that the component is disconnecting from the WebSocket server
      console.log('Disconnecting from WebSocket server');
      // Leave the 'incident-channel' to stop listening for updates
      echoInstance.leaveChannel('incident-channel');
    };
  }, []);



  const fetchData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('user_id');
      const response = await axios.get(`${baseUrl}emergency/${storedUserId}`); // Replace with your actual API endpoint
      // console.log(response.data.history);
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headinglogo} source={require('../../otapimages/header.png')} />
      </View>
      <View style={styles.boxContainer}>
        
          <HistoryBox key={historyData.id} data={historyData} style={styles.box} />
          
      </View>
    </ScrollView>
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
    marginTop: 10,
    gap: 20,
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