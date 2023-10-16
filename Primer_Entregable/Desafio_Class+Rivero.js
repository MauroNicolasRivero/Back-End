// Creo la clase product con sus atributos 
class product {
  constructor ({ id,title, description, price, thumbnail, code, stock }) {
      this.id = id
      this.title = title
      this.description = description
      this.price = price
      this.thumbnail = thumbnail
      this.code = code
      this.stock = stock
  }
}

// Creo la clase productManager con su atributo products como un arreglo vacío
class productManager {
  static idProducto = 1
  
  constructor () {
    this.products = []
  }

  static getIdNvoProd() {
    return productManager.idProducto++
  }
  
  addProduct(datos) {
    const idNvo = productManager.getIdNvoProd()
    const productoNuevo = new product({id: idNvo, ...datos})
    const codeRepeat = this.products.find(p => p.code === productoNuevo.code)
      if (codeRepeat) {
        throw new Error (`El code ${productoNuevo.code} ya esta asignado, por favor verificar información`)
      }
    this.products.push(productoNuevo)
      return productoNuevo
  } 
    
  getProducts() {
    return this.products
  }
  
  getProductsById(idProducto) {
    const buscador = this.products.find(p => p.id === idProducto)
    if (!buscador) throw new Error ("Not Found")
      return buscador    
  }
}

// Creamos una nueva instancia de productManager 
const nP = new productManager()

// LLamamos al método getproducts y nos devuelve un array vacío
console.log(nP.getProducts())

// Llamamos al método addProduct con los siguientes parámetros, el id se genera de forma automática 
const p1 = nP.addProduct({
  title: 'producto prueba',
  description:'Este es un producto prueba',
  price:200,
  thumbnail:'Sin imagen',
  code:'abc123',
  stock:25
})

// Llamamos al método getProducts dentro de un console.log nuevamente para ver el nuevo item creado
console.log(nP.getProducts())

// Llamamos al método getProductsById dentro de un console.log para buscar un producto por Id
// Sino encuentra coincidenca nos devuelve un error detallando el mismo
console.log(nP.getProductsById(1))

// Llamamos nuevamente al método addProduct, pasándole la misma información, debería darnos un error porque no
// se puede repetir el code del producto
const p2 = nP.addProduct({
  title: 'producto prueba',
  description:'Este es un producto prueba',
  price:200,
  thumbnail:'Sin imagen',
  code:'abc123',
  stock:25
})