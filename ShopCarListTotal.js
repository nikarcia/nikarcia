import React, { useEffect } from 'react';
import { BackHandler, Modal } from 'react-native';
import { Linking } from 'react-native';
import ShopCar from './ShopCar.js';
import MenuBar from './MenuBarInferior.js';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import BotonTiendasProductos from './BotonTiendasProductos.js';
import ShopCarList from './ShopCarList.js';

const ShopCarListTotal = ({ selectedOption, handleOptionPress, showGeneralCart, showHome, showMarketsCart, visible, product, closeModal, clearCart, removeFromCart, restCart, addToCart, removeFromCartUnid }) => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        closeModal();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  let total = 0
  product.map((itemproduct, index) => {
    total += itemproduct.price * itemproduct.quantityUnd
  })


  return (
    <Modal visible={visible} onRequestClose={closeModal} animationType="none">
      <View style={{ backgroundColor: 'black' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginHorizontal: 30, margin: 10, fontWeight: 'bold', textAlign: 'center', fontSize: 30, alignItems: 'center', color: 'white' }}>Carrito de compras</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'flex-end' }} >
        <TouchableOpacity style={{}} onPress={clearCart}>
          <Text style={{
            textDecorationLine: 'underline',
            fontWeight: 'bold', textAlign: 'center', fontSize: 15, alignItems: 'center',
          }}>Vaciar carrito</Text>
        </TouchableOpacity>
      </View>
      <BotonTiendasProductos selectedOption={selectedOption} handleOptionPress={handleOptionPress}></BotonTiendasProductos>
      <View style={{ flex: 1 }}>
        {selectedOption === 'productos' ?
          <View>
            {product.length == 0
              ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>Carrito Vacio</Text>
              </View>
              :
              <ShopCar product={product} clearCart={clearCart} removeFromCart={removeFromCart} removeFromCartUnid={removeFromCartUnid} addToCart={addToCart} restCart={restCart} />
            }

          </View>

          :
          <ShopCarList showHome={showHome} product={product} clearCart={clearCart} removeFromCartUnid={removeFromCart} addToCart={addToCart} restCart={restCart} />
        }
      </View>

      {product.length != 0 ?
        <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 30, margin: 0 }}>Total      </Text>
          <Text style={styles.pricetotal}>${total}</Text>
        </View>
        : <></>}
    </Modal>
  );
};

const styles = StyleSheet.create({
  pricetotal: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ff0000',
    margin: 0
  },
});


export default ShopCarListTotal;