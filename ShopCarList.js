import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { BackHandler, Modal } from 'react-native';
import ShopCar from './ShopCar.js';
import MenuBar from './MenuBarInferior.js';

const ShopCarList = ({showGeneralCart, showHome, showMarketsCart, visible, product, closeModal, clearCart, removeFromCartUnid, restCart, addToCart }) => {

  const [expandedItems, setExpandedItems] = useState([]);

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

  const hashMap = new Map();
  for (var i = 0; i < product.length; i++) {
    const market = product[i].market;
    if (hashMap.has(market)) {
      hashMap.get(market).push(product[i])
    } else {
      const nueva_lista = []
      nueva_lista.push(product[i])
      hashMap.set(market, nueva_lista);
    }
  }

  const markets = Array.from(hashMap.entries());

  const toggleItem = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedItems.includes(item[0]);
    let total = 0
    item[1].map((itemproduct, index) => {
      total += itemproduct.price * itemproduct.quantityUnd
    })

    function hexToRgba(hex, opacity) {
      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return (
    <View style={[styles.container,
     item[0]=='exito' ? {backgroundColor:hexToRgba('#ffe800',0.5)} :
     item[0]=='olimpica' ? {backgroundColor:hexToRgba('#e2001b',0.3)} :
     item[0]=='jumbo' ? {backgroundColor:hexToRgba('#1fa02e',0.5)} :
     item[0]=='metro' ? {backgroundColor:hexToRgba('#ee3124',0.3)} :
     item[0]=='carulla' ? {backgroundColor:hexToRgba('#8cb356',0.5)} :
     item[0]=='colsubsidio' ? {backgroundColor:hexToRgba('#1a9eda',0.5)} :
     {backgroundColor:'white'}]}>
        <TouchableOpacity onPress={() => toggleItem(item[0])}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={styles.market}>{item[0]}</Text>
            <Text style={styles.total}>{total}</Text>
          </View>
          <Text style={styles.numeroproductos}>{'productos: ' + item[1].length}</Text>
        </TouchableOpacity>
        {isExpanded && (
          <ShopCar product={item[1]} clearCart={clearCart} removeFromCart={removeFromCartUnid} removeFromCartUnid={removeFromCartUnid} addToCart={addToCart} restCart={restCart} />
        )
        }
      </View>
    );
  };


  return (

    <View >
      
      {markets.length == 0 ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30 }}>Carrito Vacio</Text>
        </View> :
        <FlatList
          data={markets}
          renderItem={renderItem}
          keyExtractor={(item) => item[0]}
          numColumns={1}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffe800',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 0.3,
  },
  total: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ff0000',
    margin: 0
  }, market: {
    flex: 2,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  numeroproductos: {
    fontSize: 20,
    marginBottom: 1,
  }
});
export default ShopCarList;