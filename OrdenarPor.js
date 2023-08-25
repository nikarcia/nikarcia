import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const OrdenarPor = ({selectedValue,handleValueChange}) => {

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 7 }}>
    <Text>Ordenar por:</Text>
    <View style={{ width: 180 }}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        style={{ flex: 1 }}
      // mode="dropdown"
      >
        <Picker.Item label="Relevancia" value="Relevancia" />
        <Picker.Item label="Menor precio" value="Menor precio" />
        <Picker.Item label="Mayor precio" value="Mayor precio" />
        <Picker.Item label="Precio/Med" value="Precio/Medida" />
      </Picker>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  activeButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    textAlign: 'center',
  },
  contentContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default OrdenarPor;
