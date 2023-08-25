import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TwoOptionsButton = ({ selectedOption, handleOptionPress }) => {

  return (
    <View style={{borderRadius:20}}>
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.optionButton, selectedOption === 'productos' && styles.activeButton]}
        onPress={() => handleOptionPress('productos')}
      >
        <Text style={[styles.buttonText, selectedOption === 'productos' && styles.buttonTextactive]}>Productos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.optionButton, selectedOption === 'tiendas' && styles.activeButton]}
        onPress={() => handleOptionPress('tiendas')}
      >
        <Text style={[styles.buttonText, selectedOption === 'tiendas' && styles.buttonTextactive]}>Tiendas</Text>
      </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:20,
  },
  optionButton: {
    flex: 1,
    borderRadius:20,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  activeButton: {
    borderRadius:20,
    backgroundColor: 'black',
    color:'white'
  },
  buttonText: {
    textAlign: 'center',
  },
  buttonTextactive: {
    textAlign: 'center',
    color:'white'
  },
  contentContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default TwoOptionsButton;
