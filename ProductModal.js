import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, FlatList, StyleSheet, Button } from 'react-native';
import { BackHandler, Modal } from 'react-native';
import { Linking } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

const ProductModal = ({ visible, product, closeModal, addToCart }) => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        closeModal(); // Llama a la función onClose al presionar el botón de retroceso
        return true; // Evita el comportamiento predeterminado del botón de retroceso
      }
    );

    return () => backHandler.remove(); // Elimina el listener al desmontar el componente
  }, []);

  const renderItemModal = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => handleItemPress(item.link)}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.brand}>{item.brand}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.market}>{item.market}</Text>
          <TouchableOpacity onPress={() => addToCart(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Agregar al carrito</Text>
              </View>
              <Icon name="shopping-cart" size={35} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

    </View>
  );

  const handleItemPress = (url) => {
    Linking.openURL(url);
  };

  return (

    <Modal visible={visible} onRequestClose={closeModal} animationType="none"
    //  transparent={true}
    >
      <View style={styles.modalContainer}>
        <FlatList
          data={product}
          renderItem={renderItemModal}
          keyExtractor={(item) => item.id}
          numColumns={1}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({

  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',

  },
  image: {
    width: 200,
    height: 200,
    margin: 1
  }
  ,
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  price: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ff0000',
    margin: 0
  }, market: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  modalContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.01)',
    backgroundColor: 'black',
  }, button: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default ProductModal;