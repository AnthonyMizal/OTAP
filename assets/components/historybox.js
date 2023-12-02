import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, FlatList, Modal, Pressable, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';
import {useFonts} from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';

const HistoryBox = ({data, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
    
  
      setInitialRegion({
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };
  
    getLocation(); // Call the getLocation function once without recursion
  }, []);

    let [fontsLoaded] = useFonts({
        'Momcake-Bold': require('../fonts/Momcake-Bold.otf'),
        'Momcake-Thin': require('../fonts/Momcake-Thin.otf'),
        'CL-Reg': require('../fonts/CL-Reg.ttf'),
        'CL-Bold': require('../fonts/CL-Bold.ttf'),
        'Poppins-Black': require('../fonts/Poppins-Black.ttf'),
        'Poppins-ExtraBold': require('../fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Medium': require('../fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('../fonts/Poppins-Thin.ttf'),
      });
      if (!fontsLoaded) {
        return null;
      }


           return ( 
            <View >
              
            <TouchableOpacity style={styles.box} key={data.id} onPress={() => setModalVisible(true)}>
                <View style={styles.rightCont}>
                {data.type === 'Requesting for a Fire Truck' ? (
                  <View style={styles.lineCondition1}></View>
                ) : data.type === 'Requesting for a Barangay Public Safety Officer' ? (
                  <View style={styles.lineCondition2}></View>
                ) : (
                  <View style={styles.lineDefault}></View>
                )}
                </View>
      
                <View style={styles.middleCont}>
                {data.type === 'Requesting for a Fire Truck' ? (
                  <Text style={styles.fireTxt}>You've requested a Fire Truck</Text>
                ) : data.type === 'Requesting for a Barangay Public Safety Officer' ? (
                  <Text style={styles.bpsoTxt}>You've requested a BPSO</Text>
                ) : (
                  <Text style={styles.ambulanceTxt}>You've requested an Ambulance</Text>
                )}
                </View>
               
            </TouchableOpacity> 

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={{justifyContent: 'flex-end', margin: 0}}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
              }}
              >
                 <TouchableWithoutFeedback  onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

              <View style={styles.centeredView}>
                <View style={styles.modalView}>

                <View style={styles.details}>
                  
                {data.status === 'Pending' ? (
                   <View style={styles.pendingCont}>
                    <View style={styles.pendingCircle}></View>
                    <Text style={styles.pendingStatus}>{data.status}</Text>
                   </View>
                ) : data.status === 'Responding' ? (
                  <View style={styles.respondingCont}>
                    <View style={styles.respondingCircle}></View>
                    <Text style={styles.respondingStatus}>{data.status}</Text>
                  </View>
                ) : (
                  <View style={styles.completedCont}>
                    <View style={styles.completedCircle}></View>
                    <Text style={styles.completedStatus}>{data.status}</Text>
                  </View>
                )}
                  <TouchableOpacity style={styles.buttonClose}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Icon style={styles.exit} name="close-outline"/>
                  </TouchableOpacity>

                </View>
                <View style={styles.textCont}>
                {data.type === 'Requesting for a Fire Truck' ? (
                      <Text style={styles.loginTxt2}>You've requested a Fire Truck at this location.</Text>
                    ) : data.type === 'Requesting for a Barangay Public Safety Officer' ? (
                      <Text style={styles.loginTxt2}>You've requested a BPSO at this location.</Text>
                    ) : (
                      <Text style={styles.loginTxt2}>You've requested an Ambulance at this location.</Text>
                    )}
                </View>
                    
               
                  <View style={styles.map}>
                      <MapView style={styles.googlemap} initialRegion={initialRegion}>
                      <Marker
                        coordinate={{
                          latitude: data.latitude,
                          longitude: data.longitude,
                        }}
                        title="Your Location"
                      />
                      </MapView>
                  </View>

                  <View style={styles.info}>
                  <Text style={styles.btnTxt}>Cancel your request?</Text>
                  <TouchableOpacity style={styles.getStartedBtn}>
                    <Text style={styles.getStartedTxtLogin}>ABORT</Text>
                  </TouchableOpacity>
                  </View>
                  
                  </View>
              </View>
            </Modal>
            </View>
            )

}

export default HistoryBox;

const styles = StyleSheet.create({
  box: {
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
modalOverlay: {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0,0,0,0.5)'
},
getStartedBtn: {
  marginTop: 10,
  backgroundColor: '#f54260',
  padding: 18,
  paddingHorizontal: 100,
  borderRadius: 50,
  width: '100%',
  alignItems: 'center',
  elevation: 2
},
getStartedTxtLogin: {
  color: '#fff',
  fontFamily: 'CL-Bold',
  fontSize: 16
},
btnTxt: {
  color: '#A6A6A6',
  fontFamily: 'CL-Bold',
  fontSize: 15,
  marginTop: 15
},
loginTxt2: {
  color: '#313131',
  fontFamily: 'CL-Bold',
  fontSize: 20,
  marginTop: 15
},
fireTxt: {
  color: '#f7ae77',
  fontFamily: 'CL-Bold',
  fontSize: 15,
  marginLeft: 10
},
bpsoTxt: {
  color: '#77c0f7',
  fontFamily: 'CL-Bold',
  fontSize: 15,
  marginLeft: 10
},
ambulanceTxt: {
  color: '#f77777',
  fontFamily: 'CL-Bold',
  fontSize: 15,
  marginLeft: 10
},
lineCondition1: {
  width: 20,
  height: 40,
  backgroundColor: '#f7ae77',
  borderRadius: 50
},
lineCondition2: {
  width: 20,
  height: 40,
  backgroundColor: '#77c0f7',
  borderRadius: 50
},
lineDefault: {
  width: 20,
  height: 40,
  backgroundColor: '#f77777',
  borderRadius: 50
},
middleCont:{
  justifyContent: 'center',
  minWidth: "70%",
},
textCont: {
  marginVertical: 10,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
},

    centeredView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end'
    },

  modalView: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.placeholderBG,
    borderColor: COLORS.primary,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    padding:20,
    width: '100%',
    height: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  details:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emergencydits: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  megaphone:{
    color: 'red',
    fontSize: 18,
  },
  exit: {
    color: COLORS.gray,
    fontSize: 34,
  },
  
  map: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: 'red',
    width: '100%',
    height: '50%'
  },
  googlemap: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    borderRadius: 10
  },
    
  info:{
   
    
  },
  infoicon: {
    color: 'rgb(81, 142, 239)',
  },
  pendingCont: {
    borderWidth: 1,
    borderColor: '#f54260',
    justifyContent: 'space-around',
    width: "33%",
    borderRadius: 15,
    textAlign: 'right',
    padding: 6,
    backgroundColor: '#fcc5d0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  pendingCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#f54260',
    borderRadius: 100
  },
  pendingStatus:{
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#f54260',
    fontSize: 12
  },
  respondingCont: {
    borderWidth: 1,
    borderColor: '#dbb537',
    justifyContent: 'space-around',
    width: "33%",
    borderRadius: 15,
    textAlign: 'right',
    padding: 6,
    backgroundColor: '#f9facf',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  respondingCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#dbb537',
    borderRadius: 100
  },
  respondingStatus:{
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#dbb537',
    fontSize: 10
  },
  completedCont: {
    borderWidth: 1,
    borderColor: '#37db65',
    justifyContent: 'space-around',
    width: "33%",
    borderRadius: 15,
    textAlign: 'right',
    padding: 6,
    backgroundColor: '#cbfcc5',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  completedCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#37db65',
    borderRadius: 100
  },
  completedStatus:{
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#37db65',
    fontSize: 12
  }


})