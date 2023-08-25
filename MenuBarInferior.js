import React, {  } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalada la librería de íconos

const MenuBar = ({showGeneralCart,showHome,showMarketsCart}) => {
  return (
      <View style={{ flexDirection: 'row', height:60 , borderWidth: 0.4,}}>
        <View style={{ margin:6, flex: 1 , alignItems:'center' , }}>
          <TouchableOpacity style={{flex: 1,
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center',  }} onPress={showGeneralCart}>
          <Icon name="shopping-cart" size={25}  />
          <Text style={{fontWeight: 'bold',  fontSize: 15, alignItems: 'center' }}>carrito</Text>
          </TouchableOpacity>
        </View>
        <View style={{  margin:6,padding: 0, flex: 1,alignItems:'center' }}>
          <TouchableOpacity style={{ flex: 1,flex: 1,
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center',  }} onPress={showHome}>
          <Ionicons name="home" size={20}  />
          <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 15, alignItems: 'center',  }}>Inicio</Text>
          </TouchableOpacity>
        </View>
        <View style={{  margin:6,padding: 0, flex: 1,alignItems:'center' }}>
          <TouchableOpacity style={{ flex: 1 ,flex: 1,
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center', }} onPress={showMarketsCart}>
          <Icon name="shopping-cart" size={25} />
          <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 15, alignItems: 'center',  }}>tiendas</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default MenuBar;
