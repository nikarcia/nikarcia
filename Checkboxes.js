import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Checkboxes = ({ checkboxes, handleCheck }) => {
  const markets = ['exito', 'olimpica','d1', 'jumbo', 'colsubsidio', 'carulla', 'metro', 'pasteur']
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {checkboxes.map((isChecked, index) => (
        <View key={index} style={styles.checkboxContainer}>
          <CheckBox style={{ fontSize: 10 }}
            key={index}
            title={markets[index]}
            checked={isChecked}
            titleProps={{
              style: {
                fontSize: 14,
                color: 'white'
              }
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              borderWidth: 0,
              paddingHorizontal: 0,
              margin: 0, padding: 3
            }}
            onPress={() => handleCheck(index)}
          />
        </View>
      ))}</View>
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

export default Checkboxes;
