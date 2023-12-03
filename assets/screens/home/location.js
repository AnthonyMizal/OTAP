import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from "../../constants/colors";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const YourLocation = ({navigation}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);


  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);

    setInitialRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };


  AsyncStorage.setItem('location', JSON.stringify(currentLocation));
  
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image style={styles.headinglogo} source={require('../../otapimages/header.png')} />
            <TouchableOpacity onPress={() => getLocation()}>
              <Icon
              name= 'compass'
              size={35}
              color={COLORS.primary}
              />
            </TouchableOpacity>
        </View>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion} provider={PROVIDER_GOOGLE}  
        
        zoomEnabled={true}  
        zoomControlEnabled={true} 
        mapPadding={{top: 20, right: 20}}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
        </MapView>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  header: {
    padding: 14,
    marginTop: 30,
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headinglogo: {
    width: 230,
    height: 42,
    borderWidth: 2,
  },
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default YourLocation;