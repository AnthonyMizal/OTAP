import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {COLORS} from '../constants/colors';

const data = [
  { label: 'Santa Rita', value: 'Santa Rita' },
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
    backgroundColor: COLORS.placeholderBG,
    borderRadius: 15,
  },
  dropdown: {
    width: '100%',
    borderRadius: 15,
    padding: 15,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: COLORS.placeholderBG,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 15,
    color: COLORS.gray
  },
  selectedTextStyle: {
    fontSize: 15,
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