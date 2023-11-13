import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {COLORS} from '../constants/colors';

const data = [
  { label: 'Barretto', value: 'Barretto' },
  { label: 'East Bajac-bajac', value: 'East Bajac-bajac' },
  { label: 'East Tapinac', value: 'East Tapinac' },
  { label: 'Gordon Heights', value: 'Gordon Heights' },
  { label: 'Kalaklan', value: 'Kalaklan' },
  { label: 'Mabayuan', value: 'Mabayuan' },
  { label: 'New Asinan', value: 'New Asinan' },
  { label: 'New Banicain', value: 'New Banicain' },
  { label: 'New Cabalan', value: 'New Cabalan' },
  { label: 'New Ilalim', value: 'New Ilalim' },
  { label: 'New Kababae', value: 'New Kababae' },
  { label: 'New Kalalake', value: 'New Kalalake' },
  { label: 'Old Cabalan', value: 'Old Cabalan' },
  { label: 'Pag-asa', value: 'Pag-asa' },
  { label: 'Santa Rita', value: 'Santa Rita' },
  { label: 'West Bajac-bajac', value: 'West Bajac-bajac' },
  { label: 'West Tapinac', value: 'West Tapinac' }
];

const DropdownComponent = ({ onSelectedValue }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);



  return (
    <View style={styles.container}>

      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Barangay' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
        }}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onSelectedValue(item.value);
        }}

      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

  },
  dropdown: {
    width: '100%',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.gray
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});