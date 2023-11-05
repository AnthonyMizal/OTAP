import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';


export default function YourLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text);
  }

  return (
    
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <MapView style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      zoomEnabled={true}  
      zoomControlEnabled={true} 
      mapPadding={{top: 20, right: 20}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: 400,
    height: 800
  },
  showsUserLocationStyle: {
    marginTop: 400
  }

});
