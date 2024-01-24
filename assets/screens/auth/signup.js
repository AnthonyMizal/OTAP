import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Image, Modal, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, {useState} from 'react';
import { ROUTES } from '../../constants/routes';
import {useFonts} from 'expo-font';
import {COLORS} from '../../constants/colors';
import DropdownComponent from '../../components/dropdownbarangay';
import axios from 'axios';
import CheckBox from 'expo-checkbox';
import { baseUrl } from '../../constants/url';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
const Signup = (props) => {
    const {navigation} = props;
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [contact_no, setContact] = useState("");
    const [age, setAge] = useState("");
    const [lot_no, setLot] = useState("");
    const [street, setStreet] = useState("");
    const [barangay, setBarangay] = useState("");
    const [landmark, setLandmark] = useState("");
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
    const [termsOfUseChecked, setTermsOfUseChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
    const [termsModalVisible, setTermsModalVisible] = useState(false);
    const [image, setImagePath] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [imageType, setImageType] = useState(null);
    const [idimage, setIdImagePath] = useState(null);
    const [idimageName, setIdImageName] = useState(null);
    const [idimageType, setIdImageType] = useState(null);
    const [corimage, setCorImagePath] = useState(null);
    const [corimageName, setCorImageName] = useState(null);
    const [corimageType, setCorImageType] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const togglePrivacyModal = () => {
      setPrivacyModalVisible(!privacyModalVisible);
    };
  
    const toggleTermsModal = () => {
      setTermsModalVisible(!termsModalVisible);
    };
    
    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const onChangeFirstnameHandler = (first_name) => {
      setFirstname(first_name);
    };
    const onChangeLastnameHandler = (last_name) => {
      setLastname(last_name);
    };
    const onChangeContactHandler = (contact_no) => {
      setContact(contact_no);
    };
    const onChangeAgeHandler = (age) => {
      setAge(age);
    };

    const onChangeStreetHandler = (street) => {
      setStreet(street);
    };

    const onChangeLotHandler = (lot_no) => {
      setLot(lot_no);
    };

    const onChangeBarangayHandler = (selectedBarangay) => {
      setBarangay("");
      setBarangay(selectedBarangay);
    };

    const onChangeLandmarkHandler = (landmark) => {
      setLandmark(landmark);
    };

    const onChangeUsernameHandler = (email) => {
      setUsername(email);
    };
    const onChangePasswordHandler = (password) => {
      setPassword(password);
    };

    const onPrivacyPolicyToggle = () => {
      setPrivacyPolicyChecked(!privacyPolicyChecked);
    };
  
    const onTermsOfUseToggle = () => {
      setTermsOfUseChecked(!termsOfUseChecked);
    };

    const addImage = async () => {
      let _image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,4],
          quality: 1,
      });
  
      if (!_image.canceled) {
    
        setImagePath(_image.assets[0].uri);
        setImageType(_image.assets[0].type);
        let path = _image.assets[0].uri;
          if (Platform.OS === "ios") {
          path = "~" + path.substring(path.indexOf("/Documents"));
          }
          if (!_image.assets[0].fileName){
              new_path = path.split("/").pop();
          } 
        setImageName(new_path);
  
        
      }
    }

    const addIdImage = async () => {
      let _image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [5,3],
          quality: 1,
      });
  
      if (!_image.canceled) {
    
        setIdImagePath(_image.assets[0].uri);
        setIdImageType(_image.assets[0].type);
        let path = _image.assets[0].uri;
          if (Platform.OS === "ios") {
          path = "~" + path.substring(path.indexOf("/Documents"));
          }
          if (!_image.assets[0].fileName){
              new_path = path.split("/").pop();
          } 
        setIdImageName(new_path);
      }
    }

    const addCorImage = async () => {
      
      let _image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [5,7],
          quality: 1,
      });
  
      if (!_image.canceled) {
    
        setCorImagePath(_image.assets[0].uri);
        setCorImageType(_image.assets[0].type);
        let path = _image.assets[0].uri;
          if (Platform.OS === "ios") {
          path = "~" + path.substring(path.indexOf("/Documents"));
          }
          if (!_image.assets[0].fileName){
              new_path = path.split("/").pop();
          } 
        setCorImageName(new_path);
      }
    }

    const onSubmitFormHandler = async (event) => {

      if (
        !image ||
        !first_name ||
        !last_name ||
        !age ||
        !contact_no ||
        !street ||
        !barangay ||
        !corimage ||
        !email ||
        !password ||
        !privacyPolicyChecked ||
        !termsOfUseChecked
      ) {
        ToastAndroid.show(
          'Please fill in all required fields!',
          ToastAndroid.SHORT
        );
        return;
      }

      if (!/^\d+$/.test(age)) {
        ToastAndroid.show('Age must be numeric!', ToastAndroid.SHORT);
        return;
      }
  
      if (!/^\d{11}$/.test(contact_no)) {
        ToastAndroid.show('Contact number must be numeric and 11 characters long!', ToastAndroid.SHORT);
        return;
      }

      if (!privacyPolicyChecked || !termsOfUseChecked) {
        ToastAndroid.show(
          'Please agree to the Privacy Policy and Terms of Use',
          ToastAndroid.SHORT
        );
        return;
      }
  
      setIsLoading(true);
      try {

        const data = new FormData();
        data.append('first_name', first_name);
        data.append('last_name', last_name);
        data.append('age', age);
        data.append('contact_no', contact_no);
        data.append('lot_no', lot_no);
        data.append('street', street);
        data.append('barangay', barangay);
        data.append('landmark', landmark);
        data.append('email', email);
        data.append('password', password);
        data.append('profile_picture', {
          uri: image,
          name: imageName,
          type: `image/${imageType}`,
        });
        
        if (idimage != null) {
          data.append('valid_id', {
            uri: idimage,
            name: idimageName,
            type: `image/${idimageType}`,
          });
        };
        
        data.append('cor', {
          uri: corimage,
          name: corimageName,
          type: `image/${corimageType}`,
        });

        const response = await axios.post(`${baseUrl}register`, data,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {

          setIsLoading(false);
          ToastAndroid.show('Succesfully Created an Account!', ToastAndroid.SHORT);
          return navigation.navigate(ROUTES.LOGIN);
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        alert(error);
        setIsLoading(false);
      }
    };

      let [fontsLoaded] = useFonts({
        'Momcake-Bold': require('../../fonts/Momcake-Bold.otf'),
        'Momcake-Thin': require('../../fonts/Momcake-Thin.otf'),
        'CL-Reg': require('../../fonts/CL-Reg.ttf'),
        'CL-Bold': require('../../fonts/CL-Bold.ttf'),
        'Poppins-Black': require('../../fonts/Poppins-Black.ttf'),
        'Poppins-ExtraBold': require('../../fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Medium': require('../../fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../../fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('../../fonts/Poppins-Thin.ttf'),
      });
      if (!fontsLoaded) {
        return null;
      }
    
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView 
                  style={styles.keyboardView}>
    <View style={styles.box}>

    </View>
    
    <Text style={styles.loginTxt}>Register to O-TAP!</Text>
    <Text style={styles.loginTxt2}>O-TAP is your one tap assisstant for emergency.</Text>

    <View style={styles.inputWrapper}>

    <View style={pfpStyle.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                    <View style={pfpStyle.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={pfpStyle.uploadBtn} >
                            <Text style={styles.imageText}>{image? 'Edit' : 'Upload'} Profile Pic</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                        
                    </View>
    </View>

      <Text style={styles.inputLabel}>First Name: *</Text>
      <TextInput style={styles.input}
      placeholderTextColor={COLORS.gray} 
      placeholder='ex. John'
      value={first_name}
      onChangeText={onChangeFirstnameHandler}
      />

      <Text style={styles.inputLabel}>Last Name: *</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. Doe'
      value={last_name}
      onChangeText={onChangeLastnameHandler}
      />

      <Text style={styles.inputLabel}>Contact No.: *</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. 0912345678'
      value={contact_no}
      keyboardType='numeric'
      maxLength={11}
      onChangeText={onChangeContactHandler}
      />

      <Text style={styles.inputLabel}>Age: *</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. 21'
      value={age}
      keyboardType='numeric'
      onChangeText={onChangeAgeHandler}
      />

      <Text style={styles.inputLabel}>Lot#: (Optional)</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. 15'
      keyboardType='numeric'
      />

      <Text style={styles.inputLabel}>Street: *</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. Baltazar'
      value={street}
      onChangeText={onChangeStreetHandler}
      />

      <Text style={styles.inputLabel}>Barangay: *</Text>
      <DropdownComponent onSelectedValue={onChangeBarangayHandler} />

      <Text style={styles.inputLabel}>Landmark: *</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. near Iglesia Church'
      value={landmark}
      onChangeText={onChangeLandmarkHandler}
      />

      <Text style={styles.inputLabel}>Valid ID: (Optional)</Text>
        <View style={imageUploaderStyles.container}>
                {
                    idimage  &&  <TextInput style={styles.input} placeholderTextColor={COLORS.gray}
                    value={idimageName}
                    />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addIdImage} style={imageUploaderStyles.uploadBtn} >
                            <Text style={styles.imageText}>{idimage? 'Edit' : 'Upload'} Valid ID</Text>
                        </TouchableOpacity>
                    </View>
        </View>

        <Text style={styles.inputLabel}>Certificate of Residency: *</Text>
        <View style={imageUploaderStyles.container}>
                {
                    corimage  &&  <TextInput style={styles.input} placeholderTextColor={COLORS.gray}
                    value={corimageName}
                    />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addCorImage} style={imageUploaderStyles.uploadBtn} >
                            <Text style={styles.imageText}>{corimage? 'Edit' : 'Upload'} COR</Text>
                        </TouchableOpacity>
                    </View>
        </View>

      <Text style={styles.inputLabel}>Email: *</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. example@gmail.com'
      value={email}
      onChangeText={onChangeUsernameHandler}
      />

      {/* <Text style={styles.inputLabel}>Password:</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='(must contain 8 characters)'
      secureTextEntry
      value={password}
      onChangeText={onChangePasswordHandler}
      /> */}
<Text style={styles.inputLabel}>Password: *</Text>
<View style={styles.passinput}>
        <View style={styles.passinputCont}>

             <TextInput style={styles.inputCon} placeholderTextColor={COLORS.gray} placeholder='Password'
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={onChangePasswordHandler}
              />
        </View>
         
          <TouchableOpacity style={styles.passtoggle} onPress={togglePasswordVisibility}>
                {showPassword === true ? (
                  <Icon
                  name= 'eye-off'
                  size={25}
                  color={COLORS.gray}
                  />
                  ) : (
                    <Icon
                  name= 'eye'
                  size={25}
                  color={COLORS.gray}
                  />
                  )}
          </TouchableOpacity>
      </View>
      
   
   <View style={styles.checkboxContainer}>
            <CheckBox
              value={privacyPolicyChecked}
              onValueChange={onPrivacyPolicyToggle}
            />
            <TouchableOpacity>
            <Text style={styles.checkboxLabel} onPress={togglePrivacyModal}>
              I agree to the Privacy Policy
            </Text>
            </TouchableOpacity>
          </View>

      
          <Modal visible={privacyModalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={togglePrivacyModal}>
                <Icon
                name= 'close-outline'
                size={35}
                color={COLORS.black}
                />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalBody} contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.modalTextTitle}>Privacy Policy</Text>
                <Text style={styles.modalTextDate}>Last Updated: December 1, 2023</Text>
                <Text style={styles.modalTextDetails}>One-Tap Assistance Platform (O-TAP) is an innovative approach designed to improve emergency response and safety within a barangay’s community of Olongapo City.
                  The Privacy Policy of O-TAP is commited to safeguarding the privacy of our users and ensure the security of their personal information. This Privacy Policy describes how O-TAP process personal information that we collect, use, and protect the data you provide when using the platform.</Text>
                <View style={styles.modalTextContentCont}>

                  <Text style={styles.modalTextContent}>1. Information We Collect:
                  O-TAP collects essential personal information, including names, contact details, and location data, which is required during the registration process for efficient emergency responses.</Text>
                  <Text style={styles.modalTextContent}>2. How We Use Your Information:
                  The collected information is utilized for emergency response purposes, ensuring a prompt and effective aid delivery. </Text>
                  <Text style={styles.modalTextContent}>3. Data Security:
                  We employ industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. Access to user data is restricted to authorized personnel only.</Text>
                  <Text style={styles.modalTextContent}>4. Information Sharing:
                  User information is not exchanged, sold, or rented to outside parties by O-TAP. We might exchange information with the emergency response agencies to guarantee precise and prompt help.</Text>
                  <Text style={styles.modalTextContent}>5. Updates to Privacy Policy:
                  O-TAP has the right to make necessary updates to this privacy policy. Any updates will be communicated to users, and their continued use of our services indicates their agreement to the amended terms.</Text>
                  <Text style={styles.modalTextContent}>6. User Control and Access:
                  Users have the right to access, and modify their personal information stored by O-TAP. </Text>
                  <Text style={styles.modalTextContent}>7. Consent:
                  By using O-TAP, users consent to the terms outlined in this Privacy Policy. If you disagree with any aspect, please refrain from using the platform.</Text>

                </View>
              </ScrollView>
            </View>
          </Modal>


          <View style={styles.checkboxContainer}>
            <CheckBox
              value={termsOfUseChecked}
              onValueChange={onTermsOfUseToggle}
            />
             <TouchableOpacity onPress={toggleTermsModal}>
            <Text style={styles.checkboxLabel}>
              I agree to the Terms of Use
            </Text>
            </TouchableOpacity>
          </View>

          <Modal visible={termsModalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={toggleTermsModal}>
                  <Icon
                  name= 'close-outline'
                  size={35}
                  color={COLORS.black}
                  />
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.modalBody} contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.modalTextTitle}>Terms of Use</Text>
                <Text style={styles.modalTextDate}>Last Updated: December 1, 2023</Text>
                <Text style={styles.modalTextDetails}>By using O-TAP, you acknowledge and agree to these Terms of Use:</Text>
                <View style={styles.modalTextContentCont}>

                  <Text style={styles.modalTextContent}>1. Button Activation Wait Time:
                  For enhanced efficiency and to reduce redundancy, users are required to wait for 1 minute after clicking a button before activating it again.</Text>
                  <Text style={styles.modalTextContent}>2. User Conduct:
                  Users are expected to use O-TAP responsibly and must refrain from engaging in abusive or inappropriate behavior on the platform. Please utilize this app wisely and only in situations requiring immediate assistance. If a user is found to be engaging in inappropriate behavior on the platform, the barangay will take appropriate measures to address and rectify the situation.
                  </Text>
                  <Text style={styles.modalTextContent}>3. Data Privacy:
                  O-TAP is committed to safeguarding user privacy, handling all user data in accordance with our Privacy Policy.</Text>
                  <Text style={styles.modalTextContent}>4. Accuracy of Information:
                  Users must provide accurate details during registration and any subsequent edits. This precise information is crucial for ensuring an effective and timely response from emergency services.
                  </Text>
                  <Text style={styles.modalTextContent}>5. Intellectual Property:
                  The developers own exclusive ownership of all trademarks, logos, and content related to O-TAP.</Text>
                  <Text style={styles.modalTextContent}>6. Limitation of Liability:
                  The developers of O-TAP hold no liability for any damages resulting from the use or inability to use the platform.</Text>
                  <Text style={styles.modalTextContent}>7. Modifications:
                  O-TAP reserves the right to modify these Terms of Use at any time, and users are encouraged to periodically review them.</Text>
                  <Text style={styles.modalTextContent}>8. Termination:
                  O-TAP retains the authority to terminate user access for any reason without prior notice.</Text>
                  <Text style={styles.modalTextContent}>9. Cancellation Policy: Users cannot cancel their emergency assistance request if the barangay is not responding or has forwarded the request to the appropriate emergency response team.</Text>

                </View>
              </ScrollView>
            </View>
        </Modal>

    </View>
    <TouchableOpacity style={styles.getStartedBtn} onPress={onSubmitFormHandler}>
      <Text style={styles.getStartedTxtLogin}>SIGNUP</Text>
    </TouchableOpacity>

    <View style={styles.bottomTextCont}>
      <Text style={styles.getStartedTxt}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
      <Text style={styles.registerTxt}>Login</Text>
      </TouchableOpacity>
    </View>
  
    </KeyboardAvoidingView>
    
    </ScrollView>
  </View>
     )
}

const imageUploaderStyles=StyleSheet.create({
  container:{
      elevation:2,
      backgroundColor:COLORS.placeholderBG,
      position:'relative',
      overflow:'hidden',
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 10,
      height: 65,
      width: 314
  },
  uploadBtnContainer:{
      opacity:0.7,
      position:'absolute',
      right:0,
      bottom:0,
      backgroundColor:COLORS.primary,
      width:'100%',
      height:'40%',
  },
  uploadBtn:{
      display:'flex',
      
      alignItems:"center",
      justifyContent:'center'
  }
})

const pfpStyle=StyleSheet.create({
  container:{
      elevation:2,
      height:200,
      width:200,
      backgroundColor:'#efefef',
      position:'relative',
      overflow:'hidden',
      alignSelf: 'center',
      borderRadius: 20,
      marginTop: 10
  },

  uploadBtnContainer:{
      opacity:0.7,
      position:'absolute',
      right:0,
      bottom:0,
      backgroundColor:COLORS.primary,
      width:'100%',
      height:'25%',
  },
  uploadBtn:{
      display:'flex',
      alignItems:"center",
      justifyContent:'center'
  }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      },
      imageText:{
        fontFamily: 'CL-Bold',
        color: COLORS.white,
        marginTop: 6
      },
      inputCon:{
        width:'90%'
      },
      passinput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.placeholderBG,
        borderRadius: 15,
        padding: 18,
      },
      passinputCont:{
        display: 'flex',
        flexDirection: 'row',
        gap: 7
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        textDecorationLine: 'underline',
      },
      checkboxLabel: {
        fontFamily: 'CL-Bold',
        color: COLORS.primary,
        marginLeft: 10,
        textDecorationLine: 'underline',
      },

      modalContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.background,
        margin: 20,
        borderRadius: 40
      },

      modalHeader:{
      paddingTop: 20,
       width: '100%',
       paddingRight: 20,
       display: 'flex',
       alignItems: 'flex-end'
      },

      scrollViewContainer: {
        flexGrow: 1,
      },

      modalBody: {
        flex: 1,
        paddingTop: 0,
        padding: 20,
      },

      modalTextTitle:{
        color: COLORS.primary,
        fontFamily: 'CL-Bold',
        fontSize: 20
      },

      modalTextDate:{
        color: COLORS.gray,
        fontFamily: 'CL-Bold',
      },

      modalTextDetails:{
        fontFamily: 'CL-Bold',
        fontSize: 15,
        margin: 15,
        textAlign: 'justify'
      },

      modalTextContent:{
        color: COLORS.gray,
        fontFamily: 'CL-Bold',
        margin: 15,
        textAlign: 'justify'
      },

      inputLabel: {
        fontFamily: 'CL-Bold',
        marginTop: 20,
        marginBottom: 3,
        color: COLORS.primary
      },
      box: {
        width: 330,
        height: 10,
        borderRadius: 20,
        marginTop: 50,
        display: 'flex',
        alignItems: 'center'
      },
      scrollView: {
        width: '100%',
        height: 0
      },
      picContainer: {
        width: '90%',
        height: '60%',
        alignItems: 'center',
        paddingTop: 20
      },
      keyboardView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      loginlogo: {
        width: 200,
        height: 200,
      },

      text1: {
        fontFamily: 'Momcake-Bold',
        fontSize: 14,
        color: COLORS.green
      },
      textWrapper: {
        paddingTop: 25,
        paddingLeft: 30,
        alignSelf: 'flex-start'
      },
      text2: {
        fontFamily: 'Antically',
        color: COLORS.green,
        fontSize: 34
      },
      text3: {
        fontFamily: 'Antically',
        color: COLORS.green,
        fontSize: 47
      },
      textWrapper2: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 40
      },
      getStartedBtn: {
        marginTop: 20,
        backgroundColor: COLORS.primary,
        padding: 18,
        paddingHorizontal: 100,
        borderRadius: 50,
        width: '80%',
        alignItems: 'center',
        elevation: 2
      },
      getStartedTxt: {
        color: '#737373',
        fontFamily: 'CL-Bold',
        fontSize: 16
      },
      getStartedTxtLogin: {
        color: COLORS.white,
        fontFamily: 'CL-Bold',
        fontSize: 16
      },
      input: {
        backgroundColor: COLORS.placeholderBG,
        borderRadius: 15,
        padding: 18,
      },
      inputWrapper: {
        width: '80%',
        marginTop: 40
      },
      bottomTextCont: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginVertical: 40
      },
      registerTxt: {
        textDecorationLine: 'underline',
        color: COLORS.primary,
        fontFamily: 'CL-Bold',
        fontSize: 20,
      },
      loginTxt: {
        color: COLORS.primary,
        fontFamily: 'CL-Bold',
        fontSize: 30,
      },
      loginTxt2: {
        color: '#A6A6A6',
        fontFamily: 'CL-Bold',
        fontSize: 15,
        marginTop: 15
      }
})

export default Signup;