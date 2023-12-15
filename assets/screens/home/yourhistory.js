import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import React, { useState, useEffect} from 'react';
import HistoryBox from '../../components/historybox';
import IncidentHistory from '../../components/IncidentHistory';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../constants/url';
import { useFocusEffect } from "@react-navigation/native";
import { COLORS } from '../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
const YourHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [historyIncidentData, setHistoryIncidentData] = useState([]);
  const [historyScreen, setHistoryScreen] = useState("EmergencyRequest");

  const fetchEmergencyData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('user_id');
      const response = await axios.get(`${baseUrl}emergency/${storedUserId}`); 
      setHistoryData(response.data.history);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchIncidentData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('user_id');
      const response = await axios.get(`${baseUrl}incident/${storedUserId}`); 
      setHistoryIncidentData(response.data.history);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const EmergencyScreen = () => {
    setHistoryScreen("EmergencyRequest");
  };

  const IncidentScreen = () => {
    setHistoryScreen("IncidentRequest");
  };

  useEffect(() => {
  }, [historyScreen]);

  useFocusEffect(
    React.useCallback(() => {
      fetchEmergencyData();
      fetchIncidentData();
      return () => {
        fetchEmergencyData();
        fetchIncidentData();
      };
    }, [])
  );



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headinglogo} source={require('../../otapimages/header.png')} />
      </View>

    <View style={styles.buttonMainCont}>
      <View style={styles.buttonCont}>
          <TouchableOpacity style={styles.buttonPage} onPress = {EmergencyScreen}>
          {historyScreen === "EmergencyRequest" ? (
            <View style={styles.activeButton}>
               <Text style={styles.activeText}>Emergency Requests</Text>
            </View>
            ) : (
            <View style={styles.notactiveButton}>
            <Text style={styles.notactiveText}>Emergency Requests</Text>
            </View>
            )}  
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPage} onPress = {IncidentScreen}>
          {historyScreen === "IncidentRequest" ? (
            <View style={styles.activeButton}>
               <Text style={styles.activeText}>Reported Incidents</Text>
            </View>
            ) : (
            <View style={styles.notactiveButton}>
            <Text style={styles.notactiveText}>Reported Incidents</Text>
            </View>
            )}  
          </TouchableOpacity>
        </View>
    </View>
      


      <View style={styles.boxContainer}>
        
      {historyScreen === "EmergencyRequest" ? (
    historyData.length === 0 ? (
      <View style={styles.nohistoryCont}>
        <Text style={styles.historytxt}>No history found!</Text>
      </View>
    ) : (
      <FlatList
        data={historyData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HistoryBox data={item} fetchHistory={fetchEmergencyData}/>}
      />
    )
    
  ) : (
    historyIncidentData.length === 0 ? (
      <View style={styles.nohistoryCont}>
        <Text style={styles.historytxt}>No history found!</Text>
      </View>
    ) : (
      <FlatList
        data={historyIncidentData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <IncidentHistory data={item} fetchIncidentHistory={fetchIncidentData}/>}
      />
    )
  )}  
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 120,
  },
  activeButton:{
    padding: 20,
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 50
  },
  notactiveButton:{
    padding: 20,
  },
  activeText:{
    color: '#fff',
    fontFamily: 'CL-Bold',
    fontSize: 15
  },
  notactiveText:{
    color: COLORS.primary,
    fontFamily: 'CL-Bold',
    fontSize: 15
  },
  buttonCont:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.placeholderBG,
    padding: 10,
    marginBottom: 15,
    borderRadius: 50,
    width: '90%'
  },
  buttonMainCont: {
    alignItems: 'center'
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
  historytxt: {
    fontStyle: 'italic',
    color: COLORS.gray
  },
  nohistoryCont: {
    padding: 20,
    minWidth: '90%',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 1.25,
    shadowRadius: 50,
    elevation: 2,
  },
  headinglogo: {
    width: 230,
    height: 42,
    borderWidth: 2,
  },
});

export default YourHistory;