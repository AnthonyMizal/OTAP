import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React, {useEffect} from 'react'
import echoInstance from '../../constants/laravelecho'


  
const TestRealtime = () => {

    useEffect(() => {
        // Listen for events
        echoInstance.channel('my-channel')
          .listen('my-event', (event) => {
            console.log('New data received:', event.data);
            // Handle the new data
            ToastAndroid.show('Listening....', ToastAndroid.SHORT);
          });
    
        // Clean up the subscription when the component is unmounted
        return () => {
            echoInstance.leaveChannel('my-channel');
            
        };
      }, []);

  return (
    <View>
      <Text>testrealtime</Text>
    </View>
  )
}

export default TestRealtime;

const styles = StyleSheet.create({})