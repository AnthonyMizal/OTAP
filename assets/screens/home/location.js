import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { showMessage, hideMessage } from "react-native-flash-message";
import { COLORS } from "../../constants/colors";
import FlashMessage from "react-native-flash-message";
import * as geolib from "geolib";
import customBounds from '../../components/staritabounds'
const YourLocation = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [showPolygon, setShowPolygon] = useState(true);
  const [locationScreen, setLocationScreen] = useState("CurrentLocation");

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    
  })

  const CurrentLocationScreen = () => {
    setLocationScreen("CurrentLocation");
    getLocation();
  };

  const ChooseLocationScreen = () => {
    setLocationScreen("IncidentRequest");
  };


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
     const isInsideBounds = geolib.isPointInPolygon(
      { latitude: location.coords.latitude, longitude: location.coords.longitude },
      customBounds.map(point => ({ latitude: point.latitude, longitude: point.longitude }))
    );


    if (!isInsideBounds) {
      showMessage({
        message: "You are outside the vicinity of Santa rita!",
        type: "warning",
      });
    }

    console.log(currentLocation);

    // You can also include reverse geocoding logic here to get the address if needed
  };
  const handleMapPress = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCurrentLocation({ latitude, longitude });
    console.log(currentLocation);
  };
  AsyncStorage.setItem("location", JSON.stringify(currentLocation));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image
          style={styles.headinglogo}
          source={require("../../otapimages/header.png")}
        /> */}


<View style={styles.buttonMainCont}>
      <View style={styles.buttonCont}>
          <TouchableOpacity style={styles.buttonPage} onPress={CurrentLocationScreen}>
          {locationScreen === "CurrentLocation" ? (
            <View style={styles.activeButton}>
               <Text style={styles.activeText}>Current</Text>
            </View>
            ) : (
            <View style={styles.notactiveButton}>
            <Text style={styles.notactiveText}>Current</Text>
            </View>
            )}  
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPage} onPress={ChooseLocationScreen}>
          {locationScreen === "IncidentRequest" ? (
            <View style={styles.activeButton}>
               <Text style={styles.activeText}>Other</Text>
            </View>
            ) : (
            <View style={styles.notactiveButton}>
            <Text style={styles.notactiveText}>Other</Text>
            </View>
            )}  
          </TouchableOpacity>
        </View>
    </View>

        <TouchableOpacity onPress={() => getLocation()}>
          <Icon name="compass" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
     

      
 
      {locationScreen === "CurrentLocation" ? (
       
            <MapView
              style={styles.map}
              initialRegion={initialRegion}
              provider={PROVIDER_GOOGLE}
              zoomEnabled={true}
              zoomControlEnabled={true}
              mapPadding={{ top: 20, right: 20 }}
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
              {showPolygon && (
                <Polygon
                  coordinates={customBounds}
                  fillColor="rgba(185, 232, 172, 0.5)"
                  strokeColor="#00a82a"
                />
              )}
            </MapView>
       
  ) : (
    <MapView
    style={styles.map}
    initialRegion={initialRegion}
    provider={PROVIDER_GOOGLE}
    zoomEnabled={true}
    zoomControlEnabled={true}
    mapPadding={{ top: 20, right: 20 }}
    onPress={handleMapPress}
  >
    {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Chosen Location"
              pinColor={COLORS.primary} // You can customize the pin color as desired
            />
          )}
    {showPolygon && (
      <Polygon
        coordinates={customBounds}
        fillColor="rgba(185, 232, 172, 0.5)"
        strokeColor="#00a82a"
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
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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


  
  activeButton:{
    padding: 15,
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 50
  },
  notactiveButton:{
    padding: 15,
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
    padding: 2,
    marginBottom: 5,
    borderRadius: 50,
    width: '57%',
    
  },
  boxContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginBottom: 80
  },
});

export default YourLocation;