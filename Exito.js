

const fetchApi = (url_base, url, market, hashMap, lista_productos_por_mercado, order) => {
  console.log(url)
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const productsapi = data.data.productSuggestions.products
      const lista_productos = []
      for (var i = 0; i < productsapi.length; i++) {
        var productApiObject = {
          id: productsapi[i].items[0].ean + '-' + market,
          name: productsapi[i].productName.toLowerCase(),
          brand: productsapi[i].brand.toUpperCase(),
          link: url_base + productsapi[i].link,
          image: productsapi[i].items[0].images[0].imageUrl,
          ean: productsapi[i].items[0].ean.toLowerCase(),
          market: market.toLowerCase(),
          price: productsapi[i].priceRange.sellingPrice.lowPrice,
          description:productsapi[i].description,
          position: i,
          quantity: 1
        }
        lista_productos.push(productApiObject)
        if (productsapi[i].priceRange.sellingPrice.lowPrice) {
          if (productsapi[i].priceRange.sellingPrice.lowPrice > 0) {
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


      const arrayData = Array.from(hashMap.entries());
      if (order == 'Relevancia') {
        for (var i = 0; i < arrayData.length; i++) {
          arrayData[i][1].sort((a, b) => a.price - b.price);
        }
        arrayData.sort((a, b) => a[1][0].position - b[1][0].position);
        //setProducts(arrayData)
      }
      if (order == 'Menor precio') {
        for (var i = 0; i < arrayData.length; i++) {
          arrayData[i][1].sort((a, b) => a.price - b.price);
        }
        arrayData.sort((a, b) => a[1][0].price - b[1][0].price);
        //setProducts(arrayData)
      }
      if (order == 'Mayor precio') {
        for (var i = 0; i < arrayData.length; i++) {
          arrayData[i][1].sort((a, b) => b.price - a.price);
        }
        arrayData.sort((a, b) => b[1][0].price - a[1][0].price);
       // setProducts(arrayData)
      }
      lista_productos_por_mercado.push({ market: market, lista_productos: lista_productos })
      //setproductsbyMarket(lista_productos_por_mercado)
    }
    ).catch(error => console.error(error));
}