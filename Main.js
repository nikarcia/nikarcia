import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image, FlatList, StyleSheet, TextInput, Keyboard } from 'react-native';
import base64 from 'react-native-base64'
import ProductModal from './ProductModal.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import ShopCarListTotal from './ShopCarListTotal.js';


import { Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotonTiendasProductos from './BotonTiendasProductos.js';
import OrdenarPor from './OrdenarPor.js';
import Checkboxes from './Checkboxes.js';

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [productsbyMarket, setproductsbyMarket] = useState([]);
  const [texto, setTexto] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleCar, setModalVisibleCar] = useState(false);
  const [modalVisibleCarGeneral, setModalVisibleCarGeneral] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([])
  const [checkboxes, setCheckboxes] = useState([true, true, true, true, false, false, false,false]);
  const [selectedValue, setSelectedValue] = useState('Precio/Medida');
  const [selectedOption, setSelectedOption] = useState('productos');
  const markets = ['exito', 'olimpica','d1', 'jumbo', 'colsubsidio', 'carulla', 'metro', 'pasteur']
const cantidadResultados=30
  const handleOptionPress = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    handleClick(itemValue)
  };

  const handleCheck = (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheckboxes(updatedCheckboxes);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
    setModalVisibleCarGeneral(false);
    setModalVisibleCar(false);

  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModalCar = () => {
    setModalVisibleCar(true);
    setModalVisibleCarGeneral(false);
    setModalVisible(false);
  };



  const openModalCarGeneral = () => {
    setModalVisibleCarGeneral(true);
    setModalVisibleCar(false);
  };

  const closeModalCarGeneral = () => {
    setModalVisibleCarGeneral(false);
  };


  const handleChangeText = (inputText) => {
    setTexto(inputText);
  };

  const showHome = () => {
    setModalVisibleCarGeneral(false);
    setModalVisibleCar(false);
    setModalVisible(false);
  }






  const handleClick = (order) => {

    Keyboard.dismiss();
    setProducts([])
    setproductsbyMarket([])

    const hashMap = new Map();
    const lista_productos_por_mercado = [];

    const objetoJson = {
      "productOriginVtex": false,
      "simulationBehavior": "default",
      "hideUnavailableItems": false,
      "fullText": texto,
      "count": cantidadResultados,
      "shippingOptions": []
    }
    var cadenaJson = JSON.stringify(objetoJson);
    var base64json = base64.encode(cadenaJson);

    const urlBackolimpica = 'https://www.olimpica.com/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CO&operationName=productSuggestions&variables={}&extensions={"persistedQuery":{"version":1,"sha256Hash":"768ce03567c367d005bed78147463b4e55f50634420f10f9c9a069ca04a9b012","sender":"vtex.store-resources@0.x","provider":"vtex.search-graphql@0.x"},"variables":"' + base64json + '"}'
    const urlBackexito = 'https://www.exito.com/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CO&operationName=productSuggestions&variables={}&extensions={"persistedQuery":{"version":1,"sha256Hash":"768ce03567c367d005bed78147463b4e55f50634420f10f9c9a069ca04a9b012","sender":"vtex.store-resources@0.x","provider":"vtex.search-graphql@0.x"},"variables":"' + base64json + '"}'
    const urlBackcarulla = 'https://www.carulla.com/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CO&operationName=productSuggestions&variables={}&extensions={"persistedQuery":{"version":1,"sha256Hash":"768ce03567c367d005bed78147463b4e55f50634420f10f9c9a069ca04a9b012","sender":"vtex.store-resources@0.x","provider":"vtex.search-graphql@0.x"},"variables":"' + base64json + '"}'
    const urlBackemetro = 'https://www.tiendasmetro.co/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CO&operationName=productSuggestions&variables={}&extensions={"persistedQuery":{"version":1,"sha256Hash":"768ce03567c367d005bed78147463b4e55f50634420f10f9c9a069ca04a9b012","sender":"vtex.store-resources@0.x","provider":"vtex.search-graphql@0.x"},"variables":"' + base64json + '"}'
    const urlBackjumbo = 'https://www.tiendasjumbo.co/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CO&operationName=productSuggestions&variables={}&extensions={"persistedQuery":{"version":1,"sha256Hash":"768ce03567c367d005bed78147463b4e55f50634420f10f9c9a069ca04a9b012","sender":"vtex.store-resources@0.x","provider":"vtex.search-graphql@0.x"},"variables":"' + base64json + '"}'
    const urlBackcolsubsidio = 'https://www.mercadocolsubsidio.com/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CO&operationName=productSuggestions&variables={}&extensions={"persistedQuery":{"version":1,"sha256Hash":"768ce03567c367d005bed78147463b4e55f50634420f10f9c9a069ca04a9b012","sender":"vtex.store-resources@0.x","provider":"vtex.search-graphql@0.x"},"variables":"' + base64json + '"}'
    const urlBackcopasteur = 'https://www.farmaciaspasteur.com.co/_v/segment/graphql/v1?workspace=master&maxAge=medium&appsEtag=remove&domain=store&locale=es-CO&operationName=productSuggestions&variables={}&extensions={"persistedQuery":{"version":1,"sha256Hash":"768ce03567c367d005bed78147463b4e55f50634420f10f9c9a069ca04a9b012","sender":"vtex.store-resources@0.x","provider":"vtex.search-graphql@0.x"},"variables":"' + base64json + '"}'
    const urlBackde1 = 'https://deadpool.instaleap.io/api/v2'

    for (var i = 0; i < markets.length; i++) {
      if (checkboxes[i] == true) {
        if (markets[i] == 'exito') {
          fetchApiExito('', urlBackexito, 'exito', hashMap, lista_productos_por_mercado, order)
        }
        if (markets[i] == 'olimpica') {
          fetchApiOlimpica('https://www.olimpica.com', urlBackolimpica, 'olimpica', hashMap, lista_productos_por_mercado, order)
        }
        if (markets[i] == 'colsubsidio') {
          fetchApi('https://www.mercadocolsubsidio.com', urlBackcolsubsidio, 'colsubsidio', hashMap, lista_productos_por_mercado, order)
        }
        if (markets[i] == 'carulla') {
          fetchApi('https://www.carulla.com', urlBackcarulla, 'carulla', hashMap, lista_productos_por_mercado, order)
        }
        if (markets[i] == 'metro') {
          fetchApi('https://www.tiendasmetro.co', urlBackemetro, 'metro', hashMap, lista_productos_por_mercado, order)
        }
        if (markets[i] == 'jumbo') {
          fetchApiJumbo('https://www.tiendasjumbo.co', urlBackjumbo, 'jumbo', hashMap, lista_productos_por_mercado, order)
        }
        if (markets[i] == 'pasteur') {
          fetchApi('https://www.farmaciaspasteur.com.co', urlBackcopasteur, 'pasteur', hashMap, lista_productos_por_mercado, order)
        }
        if (markets[i] == 'd1') {
          fetchApiD1('https://domicilios.tiendasd1.com', urlBackde1, 'd1', hashMap, lista_productos_por_mercado, order)
        }
      }
    }
  }

  const fetchApi = (url_base, url, market, hashMap, lista_productos_por_mercado, order) => {
    console.log(url)
    let cookieString = ''
    console.log(cookieString)
    fetch(url, {
      method: 'GET',
      headers: {
        'cookie': cookieString
      }
    })
      .then(response => response.json())
      .then(data => {
        const productsapi = data.data.productSuggestions.products
        const lista_productos = []
        for (var i = 0; i < productsapi.length; i++) {
          if (market == 'colsubsidio') {
            var quantity = '0'
            var unitMedida = 'gr'
            const quantityObject = productsapi[i].properties.filter((item) => item.name == 'Cantidad_PPUM')
            if (quantityObject.length != 0) {
              quantity = quantityObject[0].values[0]
            }
            const unitMedidaObject = productsapi[i].properties.filter((item) => item.name == 'Unidad_PPUM')
            if (unitMedidaObject.length != 0) {
              unitMedida = unitMedidaObject[0].values[0]
            }
            var productApiObject = {
              id: productsapi[i].items[0].ean + '-' + market,
              name: productsapi[i].productName.toLowerCase(),
              brand: productsapi[i].brand.toUpperCase(),
              link: url_base + productsapi[i].link,
              image: productsapi[i].items[0].images[0].imageUrl,
              ean: productsapi[i].items[0].ean.toLowerCase(),
              market: market.toLowerCase(),
              price: productsapi[i].priceRange.sellingPrice.lowPrice,
              description: productsapi[i].description,
              position: i,
              quantityUnd: 1,
              quantity: quantity,
              unitMedida: unitMedida,
              price_per_unit: (productsapi[i].priceRange.sellingPrice.lowPrice / quantity).toFixed(2)
            }
          }
          else if (market == 'carulla') {
            var quantity = '0'
            var unitMedida = 'gr'
            const quantityObject = productsapi[i].properties.filter((item) => item.name == 'Factor Neto PUM')
            if (quantityObject.length != 0) {
              quantity = quantityObject[0].values[0]
            }
            const unitMedidaObject = productsapi[i].properties.filter((item) => item.name == 'Unidad de Medida PUM Calculado')
            if (unitMedidaObject.length != 0) {
              unitMedida = unitMedidaObject[0].values[0]
            }
            var productApiObject = {
              id: productsapi[i].items[0].ean + '-' + market,
              name: productsapi[i].productName.toLowerCase(),
              brand: productsapi[i].brand.toUpperCase(),
              link: url_base + productsapi[i].link,
              image: productsapi[i].items[0].images[0].imageUrl,
              ean: productsapi[i].items[0].ean.toLowerCase(),
              market: market.toLowerCase(),
              price: productsapi[i].priceRange.sellingPrice.lowPrice,
              description: productsapi[i].description,
              position: i,
              quantityUnd: 1,
              quantity: quantity,
              unitMedida: unitMedida,
              price_per_unit: (productsapi[i].priceRange.sellingPrice.lowPrice / quantity).toFixed(2)
            }
          }
          else if (market == 'metro') {
            var quantity = '0'
            var unitMedida = 'gr'
            const quantityObject = productsapi[i].properties.filter((item) => item.name == 'ProductData')
            if (quantityObject.length != 0) {
              const propiedades = JSON.parse(quantityObject[0].values[0])
              quantity = propiedades.unit_multiplier_un * 1000
              unitMedida = propiedades.measurement_unit_un
            }

            var productApiObject = {
              id: productsapi[i].items[0].ean + '-' + market,
              name: productsapi[i].productName.toLowerCase(),
              brand: productsapi[i].brand.toUpperCase(),
              link: url_base + productsapi[i].link,
              image: productsapi[i].items[0].images[0].imageUrl,
              ean: productsapi[i].items[0].ean.toLowerCase(),
              market: market.toLowerCase(),
              price: productsapi[i].priceRange.sellingPrice.lowPrice,
              description: productsapi[i].description,
              position: i,
              quantityUnd: 1,
              quantity: quantity,
              unitMedida: unitMedida,
              price_per_unit: (productsapi[i].priceRange.sellingPrice.lowPrice / quantity).toFixed(2)
            }
          }
          
          else if (market == 'pasteur') {
            var quantity = '0'
            var unitMedida = 'gr'
            const quantityObject = productsapi[i].properties.filter((item) => item.name == 'Tamaño')
            if (quantityObject.length != 0) {
              console.log(quantityObject)
              lista_valor_total = quantityObject[0].values[0].split(' ')
              if (lista_valor_total.length == 2) {
                quantity = lista_valor_total[0]
                unitMedida = lista_valor_total[1]
              }
              if (lista_valor_total.length == 3) {
                quantity = lista_valor_total[1]
                unitMedida = lista_valor_total[2]
              }

            }

            var productApiObject = {
              id: productsapi[i].items[0].ean + '-' + market,
              name: productsapi[i].productName.toLowerCase(),
              brand: productsapi[i].brand.toUpperCase(),
              link: url_base + productsapi[i].link,
              image: productsapi[i].items[0].images[0].imageUrl,
              ean: productsapi[i].items[0].ean.toLowerCase(),
              market: market.toLowerCase(),
              price: productsapi[i].priceRange.sellingPrice.lowPrice,
              description: productsapi[i].description,
              position: i,
              quantityUnd: 1,
              quantity: quantity,
              unitMedida: unitMedida,
              price_per_unit: (productsapi[i].priceRange.sellingPrice.lowPrice / quantity).toFixed(2)
            }
          }
          else {
            var productApiObject = {
              id: productsapi[i].items[0].ean + '-' + market,
              name: productsapi[i].productName.toLowerCase(),
              brand: productsapi[i].brand.toUpperCase(),
              link: url_base + productsapi[i].link,
              image: productsapi[i].items[0].images[0].imageUrl,
              ean: productsapi[i].items[0].ean.toLowerCase(),
              market: market.toLowerCase(),
              price: productsapi[i].priceRange.sellingPrice.lowPrice,
              description: productsapi[i].description,
              position: i,
              quantity: 1,
              quantityUnd: 1,
              price_per_unit: '0/gr'

            }
          }



          if (productApiObject.price) {
            if (productApiObject.price > 0) {

              lista_productos.push(productApiObject)

              if (hashMap.has(productApiObject.ean)) {
                hashMap.get(productApiObject.ean).push(productApiObject)
              } else {
                const nueva_lista = []
                nueva_lista.push(productApiObject)
                hashMap.set(productApiObject.ean, nueva_lista);
              }
            }
          }
        }
        orderResults(lista_productos_por_mercado, lista_productos, market, hashMap, order)
      }
      ).catch(error => console.error(error));
  }

  const fetchApiD1 = (url_base, url, market, hashMap, lista_productos_por_mercado, order) => {
    console.log(url)
    const jsonData = [
      {
        operationName: 'GetProducts',
        variables: {
          filter: {},
          pagination: { pageSize: 100, currentPage: 1 },
          orderBy: {},
          search: { text: texto, language: 'ES' },
          showProductsWithoutStock: false,
          storeId: '851'
        },
        query:
          'fragment BaseProductV2 on Product {\n  id\n  description\n  name\n  brand\n  photosUrls\n  sku\n  unit\n  price\n  specialPrice\n  promotion {\n    description\n    type\n    isActive\n    conditions\n    __typename\n  }\n  variants {\n    selectors\n    productModifications\n    __typename\n  }\n  isAvailable\n  stock\n  nutritionalDetails\n  clickMultiplier\n  subQty\n  subUnit\n  maxQty\n  minQty\n  specialMaxQty\n  ean\n  boost\n  showSubUnit\n  isActive\n  slug\n  categoriesPath\n  categories {\n    id\n    name\n    __typename\n  }\n  formats {\n    format\n    equivalence\n    unitEquivalence\n    minQty\n    maxQty\n    __typename\n  }\n  tags {\n    id\n    tagReference\n    name\n    filter\n    enabled\n    description\n    backgroundColor\n    textColor\n    __typename\n  }\n  __typename\n}\n\nquery GetProducts($pagination: paginationInput, $search: SearchInput, $storeId: ID!, $categoryId: ID, $onlyThisCategory: Boolean, $filter: ProductsFilterInput, $orderBy: productsSortInput, $variants: Boolean, $showProductsWithoutStock: Boolean) {\n  getProducts(\n    pagination: $pagination\n    search: $search\n    storeId: $storeId\n    categoryId: $categoryId\n    onlyThisCategory: $onlyThisCategory\n    filter: $filter\n    orderBy: $orderBy\n    variants: $variants\n    showProductsWithoutStock: $showProductsWithoutStock\n  ) {\n    redirectTo\n    products {\n      ...BaseProductV2\n      __typename\n    }\n    paginator {\n      pages\n      page\n      __typename\n    }\n    __typename\n  }\n}'
      }
    ];
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then(response => response.json())
      .then(data => {
        const productsapi = data[0].data.getProducts.products
        const lista_productos = []
        for (var i = 0; i < productsapi.length; i++) {
          console.log(productsapi[i])
          var productApiObject = {
            id: productsapi[i].ean[0] + '-' + market,
            name: productsapi[i].name.toLowerCase(),
            brand: productsapi[i].brand.toUpperCase(),
            link: url_base +'/p/' + productsapi[i].slug ,
            image: productsapi[i].photosUrls[0],
            ean: productsapi[i].ean[0].toLowerCase(),
            market: market.toLowerCase(),
            price: productsapi[i].price,
            description: productsapi[i].description,
            position: i,
            quantityUnd: 1,
            quantity: productsapi[i].subQty,
            unitMedida: productsapi[i].subUnit,
            price_per_unit: (productsapi[i].price / productsapi[i].subQty).toFixed(2)
          }
          lista_productos.push(productApiObject)

          if (productApiObject.price) {
            if (productApiObject.price > 0) {
              if (hashMap.has(productApiObject.ean)) {
                hashMap.get(productApiObject.ean).push(productApiObject)
              } else {
                const nueva_lista = []
                nueva_lista.push(productApiObject)
                hashMap.set(productApiObject.ean, nueva_lista);
              }
            }
          }
          console.log(productApiObject)
        }
        orderResults(lista_productos_por_mercado, lista_productos, market, hashMap, order)
      }
      ).catch(error => console.error(error));
  }

  const fetchApiOlimpica = (url_base, url, market, hashMap, lista_productos_por_mercado, order) => {
    console.log(url)
    let cookieString = ''
    cookieString = 'vtex_segment=eyJjYW1wYWlnbnMiOm51bGwsImNoYW5uZWwiOiIxIiwicHJpY2VUYWJsZXMiOm51bGwsInJlZ2lvbklkIjoiVTFjamIyeHBiWEJwWTJGemQyd3hOakk0IiwidXRtX2NhbXBhaWduIjpudWxsLCJ1dG1fc291cmNlIjpudWxsLCJ1dG1pX2NhbXBhaWduIjpudWxsLCJjdXJyZW5jeUNvZGUiOiJDT1AiLCJjdXJyZW5jeVN5bWJvbCI6IiQiLCJjb3VudHJ5Q29kZSI6IkNPTCIsImN1bHR1cmVJbmZvIjoiZXMtQ08iLCJjaGFubmVsUHJpdmFjeSI6InB1YmxpYyJ9;';
    console.log(cookieString)
    fetch(url, {
      method: 'GET',
      headers: {
        'cookie': cookieString
      }
    })
      .then(response => response.json())
      .then(data => {
        const productsapi = data.data.productSuggestions.products
        const lista_productos = []
        for (var i = 0; i < productsapi.length; i++) {

          var quantity = '0'
          var unitMedida = 'gr'
          const quantityObject = productsapi[i].properties.filter((item) => item.name == 'unit_multiplier')
          if (quantityObject.length != 0) {
            quantity = quantityObject[0].values[0]
          }
          const unitMedidaObject = productsapi[i].properties.filter((item) => item.name == 'measurement_unit')
          if (unitMedidaObject.length != 0) {
            unitMedida = unitMedidaObject[0].values[0]
          }
          var productApiObject = {
            id: productsapi[i].items[0].ean + '-' + market,
            name: productsapi[i].productName.toLowerCase(),
            brand: productsapi[i].brand.toUpperCase(),
            link: url_base + productsapi[i].link,
            image: productsapi[i].items[0].images[0].imageUrl,
            ean: productsapi[i].items[0].ean.toLowerCase(),
            market: market.toLowerCase(),
            price: productsapi[i].priceRange.sellingPrice.lowPrice,
            description: productsapi[i].description,
            position: i,
            quantityUnd: 1,
            quantity: quantity,
            unitMedida: unitMedida,
            price_per_unit: (productsapi[i].priceRange.sellingPrice.lowPrice / quantity).toFixed(2)
          }
          lista_productos.push(productApiObject)

          if (productApiObject.price) {
            if (productApiObject.price > 0) {
              if (hashMap.has(productApiObject.ean)) {
                hashMap.get(productApiObject.ean).push(productApiObject)
              } else {
                const nueva_lista = []
                nueva_lista.push(productApiObject)
                hashMap.set(productApiObject.ean, nueva_lista);
              }
            }
          }
        }

        orderResults(lista_productos_por_mercado, lista_productos, market, hashMap, order)
      }
      ).catch(error => console.error(error));
  }

  const fetchApiExito = (url_base, url, market, hashMap, lista_productos_por_mercado, order) => {
    console.log(url)
    let cookieString = ''
    cookieString = 'vtex_segment=eyJjYW1wYWlnbnMiOm51bGwsImNoYW5uZWwiOiIxIiwicHJpY2VUYWJsZXMiOm51bGwsInJlZ2lvbklkIjoiVTFjalpYaHBkRzlqYjJ3ME1ESTEiLCJ1dG1fY2FtcGFpZ24iOm51bGwsInV0bV9zb3VyY2UiOm51bGwsInV0bWlfY2FtcGFpZ24iOm51bGwsImN1cnJlbmN5Q29kZSI6IkNPUCIsImN1cnJlbmN5U3ltYm9sIjoiJCIsImNvdW50cnlDb2RlIjoiQ09MIiwiY3VsdHVyZUluZm8iOiJlcy1DTyIsImFkbWluX2N1bHR1cmVJbmZvIjoiZXMtQ08iLCJjaGFubmVsUHJpdmFjeSI6InB1YmxpYyJ9;';
    console.log(cookieString)
    fetch(url, {
      method: 'GET',
      headers: {
        'cookie': cookieString
      }
    })
      .then(response => response.json())
      .then(data => {
        const productsapi = data.data.productSuggestions.products
        const lista_productos = []
        for (var i = 0; i < productsapi.length; i++) {

          var quantity = '0'
          var unitMedida = 'gr'
          const quantityObject = productsapi[i].properties.filter((item) => item.name == 'Factor Neto PUM')
          if (quantityObject.length != 0) {
            quantity = quantityObject[0].values[0]
          }
          const unitMedidaObject = productsapi[i].properties.filter((item) => item.name == 'Unidad de Medida PUM Calculado')
          if (unitMedidaObject.length != 0) {
            unitMedida = unitMedidaObject[0].values[0]
          }
          var productApiObject = {
            id: productsapi[i].items[0].ean + '-' + market,
            name: productsapi[i].productName.toLowerCase(),
            brand: productsapi[i].brand.toUpperCase(),
            link: url_base + productsapi[i].link,
            image: productsapi[i].items[0].images[0].imageUrl,
            ean: productsapi[i].items[0].ean.toLowerCase(),
            market: market.toLowerCase(),
            price: productsapi[i].priceRange.sellingPrice.lowPrice,
            description: productsapi[i].description,
            position: i,
            quantity: quantity,
            quantityUnd: 1,
            unitMedida: unitMedida,
            price_per_unit: (productsapi[i].priceRange.sellingPrice.lowPrice / quantity).toFixed(2)
          }
          lista_productos.push(productApiObject)

          if (productApiObject.price) {
            if (productApiObject.price > 0) {
              if (hashMap.has(productApiObject.ean)) {
                hashMap.get(productApiObject.ean).push(productApiObject)
              } else {
                const nueva_lista = []
                nueva_lista.push(productApiObject)
                hashMap.set(productApiObject.ean, nueva_lista);
              }
            }
          }
        }
        orderResults(lista_productos_por_mercado, lista_productos, market, hashMap, order)
      }
      ).catch(error => console.error(error));
  }

  const fetchApiJumbo = (url_base, url, market, hashMap, lista_productos_por_mercado, order) => {
    console.log(url)
    let cookieString = ''
    cookieString = 'vtex_segment=eyJjYW1wYWlnbnMiOm51bGwsImNoYW5uZWwiOiIxIiwicHJpY2VUYWJsZXMiOm51bGwsInJlZ2lvbklkIjoidjIuOUY3NTE2M0RGMjE3M0ZCRDIxQUJCQzNEMDZDODIwQTUiLCJ1dG1fY2FtcGFpZ24iOiJKdW1ib19hb25fbm9uZm9vZF9wZXJmb3JtYW5jZSIsInV0bV9zb3VyY2UiOiJnb29nbGUiLCJ1dG1pX2NhbXBhaWduIjpudWxsLCJjdXJyZW5jeUNvZGUiOiJDT1AiLCJjdXJyZW5jeVN5bWJvbCI6IiQiLCJjb3VudHJ5Q29kZSI6IkNPTCIsImN1bHR1cmVJbmZvIjoiZXMtQ08iLCJjaGFubmVsUHJpdmFjeSI6InB1YmxpYyJ9;'
    console.log(cookieString)
    fetch(url, {
      method: 'GET',
      headers: {
        'cookie': cookieString
      }
    })
      .then(response => response.json())
      .then(data => {
        const productsapi = data.data.productSuggestions.products
        const lista_productos = []
        for (var i = 0; i < productsapi.length; i++) {

          var quantity = '0'
          var unitMedida = 'gr'
          const quantityObject = productsapi[i].properties.filter((item) => item.name == 'ProductData')
          if (quantityObject.length != 0) {
            const propiedades = JSON.parse(quantityObject[0].values[0])
            quantity = propiedades.unit_multiplier_un * 1000
            unitMedida = propiedades.measurement_unit_un
          }

          var productApiObject = {
            id: productsapi[i].items[0].ean + '-' + market,
            name: productsapi[i].productName.toLowerCase(),
            brand: productsapi[i].brand.toUpperCase(),
            link: url_base + productsapi[i].link,
            image: productsapi[i].items[0].images[0].imageUrl,
            ean: productsapi[i].items[0].ean.toLowerCase(),
            market: market.toLowerCase(),
            price: productsapi[i].items[0].sellers[0].commertialOffer.spotPrice,
            description: productsapi[i].description,
            position: i,
            quantityUnd: 1,
            quantity: quantity,
            unitMedida: unitMedida,
            price_per_unit: (productsapi[i].priceRange.sellingPrice.lowPrice / quantity).toFixed(2)
          }
          lista_productos.push(productApiObject)

          if (productApiObject.price) {
            if (productApiObject.price > 0) {
              if (hashMap.has(productApiObject.ean)) {
                hashMap.get(productApiObject.ean).push(productApiObject)
              } else {
                const nueva_lista = []
                nueva_lista.push(productApiObject)
                hashMap.set(productApiObject.ean, nueva_lista);
              }
            }
          }
        }
        orderResults(lista_productos_por_mercado, lista_productos, market, hashMap, order)
      }
      ).catch(error => console.error(error));
  }

  const orderResults = (lista_productos_por_mercado, lista_productos, market, hashMap, order) => {



    
    const arrayData = Array.from(hashMap.entries());
    if (order == 'Relevancia') {
      for (var i = 0; i < arrayData.length; i++) {
        arrayData[i][1].sort((a, b) => a.price - b.price);
      }
      arrayData.sort((a, b) => a[1][0].position - b[1][0].position);
    }
    if (order == 'Menor precio') {
      for (var i = 0; i < arrayData.length; i++) {
        arrayData[i][1].sort((a, b) => a.price - b.price);
      }
      lista_productos.sort((a, b) => a.price - b.price);
      arrayData.sort((a, b) => a[1][0].price - b[1][0].price);
    }
    if (order == 'Mayor precio') {
      for (var i = 0; i < arrayData.length; i++) {
        arrayData[i][1].sort((a, b) => b.price - a.price);
      }
      arrayData.sort((a, b) => b[1][0].price - a[1][0].price);
      lista_productos.sort((a, b) => b.price - a.price);

    }
    if (order == 'Precio/Medida') {
      for (var i = 0; i < arrayData.length; i++) {
        arrayData[i][1].sort((a, b) => a.price_per_unit - b.price_per_unit);
      }
      arrayData.sort((a, b) => a[1][0].price_per_unit - b[1][0].price_per_unit);
      lista_productos.sort((a, b) => a.price_per_unit - b.price_per_unit);

      
    }

    setProducts(arrayData)
    lista_productos_por_mercado.push({ market: market, lista_productos: lista_productos })
    setproductsbyMarket(lista_productos_por_mercado)

  }


  const addToCart = (product) => {
    var encontrado = false
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id == product.id) {
        cartItems[i].quantityUnd++
        setCartItems([...cartItems]);
        encontrado = true
        break
      }
    }
    if (!encontrado) {
      setCartItems([...cartItems, product]);
    }
    Toast.show({
      type: 'success',
      text2: 'Añadido al carrito',
      text1: product.name,
      visibilityTime: 800,
      autoHide: true,
    });
  };

  const addToCartNoToast = (product) => {
    var encontrado = false
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id == product.id) {
        cartItems[i].quantityUnd++
        setCartItems([...cartItems]);
        encontrado = true
        break
      }
    }
    if (!encontrado) {
      setCartItems([...cartItems, product]);
    }
  };



  const restCart = (product) => {
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id == product.id) {
        if (cartItems[i].quantityUnd > 0) {
          cartItems[i].quantityUnd--
          setCartItems([...cartItems]);
          break
        }
      }
    }
  };

  const removeFromCart = (product) => {
    setCartItems([...cartItems.filter((item) => item.id !== product.id)]);
  };

  const clearCartGeneral = () => {
    setCartItems([]);
  };

  const removeFromCartGeneral = (productId) => {
    setCartItems(cartItems.filter((item) => item[0] !== productId));
  };

  const handleItemPress = (url) => {
    Linking.openURL(url);
  };
  function hexToRgba(hex, opacity) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const renderItem = ({ item }) => {
    if (item[1]) {
      return <View style={[styles.container]}>
        {item[1].map((product, index) => {
          var quantity = 0
          return <View key={index} >
            <TouchableOpacity onPress={() => openModal(item[1])}>
              {index == 0 ? <View style={{
                justifyContent: 'center', alignItems: 'center',
              }}>
                <Image source={{ uri: product.image }} style={{ height: 100, width: 100 }} />
                <Text style={{ fontSize: 8 }}>{product.ean}</Text>
                <Text style={styles.itemTitle}>{product.name}</Text></View> : <></>}
            </TouchableOpacity>
            <View style={[{
              flexDirection: 'row', flex: 1,
              margin: 1,
              padding: 3,
              borderRadius: 8,
            }, product.market == 'exito' ? { backgroundColor: hexToRgba('#ffe800', 0.1) } :
              product.market == 'olimpica' ? { backgroundColor: hexToRgba('#e2001b', 0.1) } :
                product.market == 'jumbo' ? { backgroundColor: hexToRgba('#1fa02e', 0.1) } :
                  product.market == 'metro' ? { backgroundColor: hexToRgba('#ee3124', 0.1) } :
                    product.market == 'carulla' ? { backgroundColor: hexToRgba('#8cb356', 0.1) } :
                      product.market == 'colsubsidio' ? { backgroundColor: hexToRgba('#1a9eda', 0.1) } :
                        { backgroundColor: 'white' }]}>
              <View style={{ flex: 3, fontSize: 15, margin: 0 }}>
                <TouchableOpacity onPress={() => handleItemPress(product.link)}>
                  <Text style={styles.itemPrice}>$ {product.price}</Text>
                  <Text numberOfLines={1} style={{ flex: 2, fontSize: 13, margin: 0, fontWeight: 'bold' }}>{product.market}</Text>
                  <Text numberOfLines={1} style={{ flex: 2, fontSize: 10, margin: 0 }}>{product.price_per_unit}/{product.unitMedida}</Text>

                </TouchableOpacity>
              </View>
              {quantity == 0 ?
                <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0.1, borderRadius: 1, padding: 1, backgroundColor: '#fb8500' }}>
                  <TouchableOpacity onPress={() => addToCart(product)}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="shopping-cart" size={20} color="white" />
                      <Text style={{ fontSize: 10, color: 'white' }}>agregar</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                :
                <TouchableOpacity onPress={() => addToCart(product)}>
                  <Text style={styles.itemPrice}>{quantity}</Text>
                </TouchableOpacity>}
            </View>
          </View>
        })}
      </View>
    }
  }

  const renderItemproductsbyMarket = ({ item }) => {
    return (
      <View style={[styles.container,
      item.market == 'exito' ? { backgroundColor: hexToRgba('#ffe800', 0.5) } :
        item.market == 'olimpica' ? { backgroundColor: hexToRgba('#e2001b', 0.3) } :
          item.market == 'jumbo' ? { backgroundColor: hexToRgba('#1fa02e', 0.5) } :
            item.market == 'metro' ? { backgroundColor: hexToRgba('#ee3124', 0.3) } :
              item.market == 'carulla' ? { backgroundColor: hexToRgba('#8cb356', 0.5) } :
                item.market == 'colsubsidio' ? { backgroundColor: hexToRgba('#1a9eda', 0.5) } :
                  { backgroundColor: 'white' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={{ flex: 1 }}>{item.market}</Text>
          <Text style={styles.numeroproductos}>{'productos: ' + item.lista_productos.length}</Text>
        </View>
        <View style={styles.containerlist}>
          <FlatList
            data={item.lista_productos}
            horizontal
            renderItem={renderItemproductsbyMarketlist}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContentContainer}
          />
        </View>
      </View>
    );
  }

  const renderItemproductsbyMarketlist = ({ item }) => {
    return (
      <View style={[styles.container]}>
        <View style={{ width: 105 }} >
          <TouchableOpacity onPress={() => openModal([item])}>
            <View style={{
              justifyContent: 'center',
            }}>
              <Image source={{ uri: item.image }} style={{ height: 100, width: 100 }} />
              <Text style={{ fontSize: 8 }}>{item.ean}</Text>
              <Text style={styles.itemPrice}>$ {item.price}</Text>
              <Text numberOfLines={3} style={styles.itemTitle}>{item.name}</Text></View>

          </TouchableOpacity>
          <View style={[{
            flex: 1,
            margin: 1,
            padding: 3,
            borderRadius: 8,
          }, item.market == 'exito' ? { backgroundColor: hexToRgba('#ffe800', 0.1) } :
            item.market == 'olimpica' ? { backgroundColor: hexToRgba('#e2001b', 0.1) } :
              item.market == 'jumbo' ? { backgroundColor: hexToRgba('#1fa02e', 0.1) } :
                item.market == 'metro' ? { backgroundColor: hexToRgba('#ee3124', 0.1) } :
                  item.market == 'carulla' ? { backgroundColor: hexToRgba('#8cb356', 0.1) } :
                    item.market == 'colsubsidio' ? { backgroundColor: hexToRgba('#1a9eda', 0.1) } :
                      { backgroundColor: 'white' }]}>
            <View style={{ flex: 3, fontSize: 15, margin: 0 }}>
              <TouchableOpacity onPress={() => handleItemPress(product.link)}>
                <Text numberOfLines={1} style={{ flex: 2, fontSize: 13, margin: 0 }}>{item.price_per_unit}/{item.unitMedida}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ borderWidth: 0.1, borderRadius: 5, padding: 0, backgroundColor: '#fb8500' }}>
              <TouchableOpacity onPress={() => addToCart(item)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name="shopping-cart" size={20} color="white" />
                  <Text style={{ fontSize: 10, color: 'white' }}>agregar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }




  return (
    <View style={{ flex: 1 }}>
      <ShopCarListTotal selectedOption={selectedOption} handleOptionPress={handleOptionPress} showGeneralCart={openModalCarGeneral} showHome={showHome} showMarketsCart={openModalCar} visible={modalVisibleCarGeneral} product={cartItems} closeModal={closeModalCarGeneral} clearCart={clearCartGeneral} removeFromCart={removeFromCartGeneral} removeFromCartUnid={removeFromCart} addToCart={addToCartNoToast} restCart={restCart} />
      <ProductModal visible={modalVisible} product={selectedProduct} closeModal={closeModal} addToCart={addToCart} />

      <View style={{ backgroundColor: 'black' }}>
        <View style={{
          flexDirection: 'row', marginHorizontal: 20
        }}>

          <View style={{
            flex: 1,
            flexDirection: 'row', alignItems: 'center',
            padding: 0,
            margin: 10,
            borderWidth: 2,
            borderColor: '#ccc',
            backgroundColor: '#fff',
            borderRadius: 100,
            marginHorizontal: 20

          }}>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleClick(selectedValue)}>
              <Ionicons name="search" size={20} color="#333" />
            </TouchableOpacity>
            <TextInput
              placeholder="¿Que buscas?"
              style={styles.input}
              value={texto}
              onChangeText={handleChangeText}
              onSubmitEditing={() => handleClick(selectedValue)}
            />
          </View>

          <TouchableOpacity style={{
            justifyContent: 'center',
            borderRadius: 100,
            borderWidth: 2,
            borderColor: 'white',
            alignItems: 'center',
            marginHorizontal: 15,
            flexDirection: 'row'
          }} onPress={openModalCarGeneral}>
            <View style={{
              justifyContent: 'center',
              borderColor: 'white',
              alignItems: 'center',
              marginHorizontal: 5,
              flexDirection: 'row'
            }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, alignItems: 'center', color: 'white' }}>{cartItems.length}</Text>
              <Icon name="shopping-cart" size={30} color="white" />
            </View>

          </TouchableOpacity>
        </View>
        <Checkboxes checkboxes={checkboxes} handleCheck={handleCheck}></Checkboxes>
      </View>

      <OrdenarPor selectedValue={selectedValue} handleValueChange={handleValueChange} />
      <Text style={{marginHorizontal:5,fontSize: 10,marginVertical:2,
    fontWeight: 'bold',}}>Los precios y disponibilidad de los productos pueden variar de acuerdo a la tienda y ubicacion, puedes consultar el precio en la pagina oficial de cada tienda dando click sobre el producto que desees</Text>
      
      <BotonTiendasProductos selectedOption={selectedOption} handleOptionPress={handleOptionPress}></BotonTiendasProductos>

      {selectedOption === 'tiendas' && (
        <FlatList
          data={productsbyMarket}
          renderItem={renderItemproductsbyMarket}
          keyExtractor={(item) => item.market}
          numColumns={1}
        />
      )}

      {selectedOption === 'productos' && (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item[0]}
          numColumns={3}
        />
      )}

      {/* <MenuBar showGeneralCart={openModalCarGeneral} showHome={showHome} showMarketsCart={openModalCar}></MenuBar> */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 30,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  containerbutontiendaproductos: {
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

  itemImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 100,
    margin: 1
  }, checkboxContainer: {
    flexDirection: 'row',
    width: '33.33%',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#ff0000',
    margin: 0
  }, container: {
    flex: 1,
    margin: 3,
    padding: 3,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 20,
    borderWidth: 0.3, borderColor: 'black'
  },
  button: {
    backgroundColor: 'black',
    padding: 1,
    borderRadius: 5,
  },
  buttonText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  }, containerlist: {
    flex: 1,
    marginTop: 20,
  },
  listContentContainer: {
    paddingHorizontal: 10,
  },
  itemContainerlist: {
    backgroundColor: '#f2f2f2',
    width: 100, // Ancho fijo para cada elemento
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default ProductGallery;
