import React, { } from 'react';
import { TouchableOpacity, View, Text, Image, FlatList, StyleSheet, Button } from 'react-native';
import { Linking } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const ShopCar = ({ product, restCart, addToCart, removeFromCartUnid }) => {

  const handleItemPress = (url) => {
    Linking.openURL(url);
  };

  const renderItemModal = ({ item }) => {
    return <View style={styles.container}>
      <View style={{ alignItems: 'center' ,margin:0,padding:0}}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', margin:5}}>
            <TouchableOpacity onPress={() => handleItemPress(item.link)}>
              <Image source={{ uri: item.image }} style={{ margin: 0, height: 80, width: 70, padding: 0 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center', margin:5}}>
            <Text style={{ fontSize: 11 }}>{item.brand}</Text>
            <Text style={{ fontSize: 11 }}>{item.ean}</Text>
            <Text style={styles.price}>$ {item.price * item.quantityUnd}</Text>
            <Text style={{ fontSize: 12 }}>({item.price}/und)</Text>
          </View>
          <View style={{ margin:5}}>
            <TouchableOpacity onPress={() => removeFromCartUnid(item)}>
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Icon name="trash" size={25} color="gray" />
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center', flex: 1 }}>
              <View style={{ width: 30  }}>
                <TouchableOpacity style={{ backgroundColor: '#fb8500', borderRadius: 5, padding: 5 }} onPress={() => restCart(item)}>
                  <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>-</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.quantity}> {item.quantityUnd} </Text>
              <View style={{ width: 30 }}>
                <TouchableOpacity style={{ backgroundColor: '#fb8500', borderRadius: 5, padding: 5 }} onPress={() => addToCart(item)}>
                  <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {item.market=='exito'?
        <View style={{ fontSize: 25, margin: 0, backgroundColor: '#ffe800', flex: 1, width: '100%'  , borderWidth:1 }}>
        <Text style={{ fontSize: 15, margin: 0, color: 'black',textAlign: 'center' }}>{item.market}</Text>
      </View>:<></>}
      {item.market=='olimpica'?
        <View style={{ fontSize: 25, margin: 0, backgroundColor: '#e2001b', flex: 1, width: '100%'  , borderWidth:1 }}>
        <Text style={{ fontSize: 15, margin: 0, color: 'white',textAlign: 'center' }}>{item.market}</Text>
      </View>:<></>}
      {item.market=='jumbo'?
        <View style={{ fontSize: 25, margin: 0, backgroundColor: '#1fa02e', flex: 1, width: '100%'  , borderWidth:1 }}>
        <Text style={{ fontSize: 15, margin: 0, color: 'white',textAlign: 'center' }}>{item.market}</Text>
      </View>:<></>}
      {item.market=='metro'?
        <View style={{ fontSize: 25, margin: 0, backgroundColor: '#ee3124', flex: 1, width: '100%'  , borderWidth:1 }}>
        <Text style={{ fontSize: 15, margin: 0, color: 'white',textAlign: 'center' }}>{item.market}</Text>
      </View>:<></>}
      {item.market=='carulla'?
        <View style={{ fontSize: 25, margin: 0, backgroundColor: '#8cb356', flex: 1, width: '100%'  , borderWidth:1 }}>
        <Text style={{ fontSize: 15, margin: 0, color: 'white',textAlign: 'center' }}>{item.market}</Text>
      </View>:<></>}
      {item.market=='colsubsidio'?
        <View style={{ fontSize: 25, margin: 0, backgroundColor: '#1a9eda', flex: 1, width: '100%'  , borderWidth:1 }}>
        <Text style={{ fontSize: 15, margin: 0, color: 'white',textAlign: 'center' }}>{item.market}</Text>
      </View>:<></>}
          
      </View>
    </View>
  }

  return (
    <FlatList
      data={product}
      renderItem={renderItemModal}
      keyExtractor={(item) => item.id}
      numColumns={1}
    />
  );
};

const styles = StyleSheet.create({
   pricetotal: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 40,
    color: '#ff0000',
    margin: 0
  }, container: {
    margin: 6,
    flex: 1,
    padding: 0,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    borderWidth: 0.3,
  },
  image: {
    width: 100,
    height: 100,
    margin: 1
  }
  ,
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 1,
    margin:5
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ff0000',
    margin: 0
  },
  total: {
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
  },
  modalContainer: {
    padding: 30,
    justifyContent: 'center',
  }
  , itemImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 50,
    margin: 1
  }
  ,
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  itemPrice: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ff0000',
    margin: 0
  },
  button: {
    backgroundColor: 'black',
  },
  buttonText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default ShopCar;