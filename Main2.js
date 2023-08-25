import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const HorizontalList = () => {
  const data = [
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' },
    { id: '5', text: 'Item 5' },
    { id: '5', text: 'Item 5' },

    { id: '5', text: 'Item 5' },

  ];

  return (
    <View style={styles.containerlist}>
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.itemContainerlist}>
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerlist: {
    flex: 1,
    marginTop: 20,
  },
  listContentContainer: {
    paddingHorizontal: 10,
  },
  itemContainerlist: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default HorizontalList;
