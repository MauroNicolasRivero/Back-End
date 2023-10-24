// Importo el modulo fs.promises
const { promises: fs } = require('fs')

// Creo la clase product con sus atributos 
class product {
  constructor({ id, title, description, price, thumbnail, code, stock }) {
    this.id = id
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.code = code
    this.stock = stock
  }
}

// Creo la clase productManager con sus atributos, products es un arreglo vacío
class productManager {
  static idProducto = 1
  constructor({ path }) {
    this.path = path
    this.products = []
  }
  static getIdNewProd() {
    return productManager.idProducto++
  }

  async reset() {
    this.products = []
    await this.writeProducts()
  }

  async addProducts(datos) {
    await this.readProducts()
    const idNvo = productManager.getIdNewProd()
    const productoNuevo = new product({ id: idNvo, ...datos })
    const codeRepeat = this.products.find(p => p.code === productoNuevo.code)
    if (codeRepeat) {
      throw new Error(`El code ${productoNuevo.code} ya esta asignado, por favor verificar información`)
    }
    this.products.push(productoNuevo)
    await this.writeProducts()
    return productoNuevo
  }

  async writeProducts() {
    const productsJson = JSON.stringify(this.products, null, 2)
    await fs.writeFile(this.path, productsJson)
  }

  async getProducts() {
    await this.readProducts()
    return this.products
  }

  async readProducts() {
    const productInJson = await fs.readFile(this.path, 'utf-8')
    const dataProductsArray = JSON.parse(productInJson)
    this.products = dataProductsArray.map(i => new product(i))
  }

  async getProductsById(idProducto) {
    await this.readProducts()
    const buscador = this.products.find(p => p.id === idProducto)
    if (!buscador) throw new Error("Not Found")
    return buscador
  }

  async updateProducts(id, prodData) {
    await this.readProducts()
    const index = this.products.findIndex(p => p.id === id)
    if (index !== -1) {
      const nuevoProd = new product({ id, ...this.products[index], ...prodData })
      this.products[index] = nuevoProd
      await this.writeProducts()
      return nuevoProd
    } else {
      throw new Error('error al actualizar: usuario no encontrado')
    }
  }

  async deleteProducts(id) {
    await this.readProducts()
    const index = this.products.findIndex(p => p.id === id)
    if (index !== -1) {
      const arrayWithDeletes = this.products.splice(index, 1)
      await this.writeProducts()
      return arrayWithDeletes[0]
    } else {
      throw new Error('error al borrar: usuario no encontrado')
    }
  }
}

// Creo una nueva instancia de productManager, lo hago dentro de la funcion Main() para poder
// trabajar de forma asíncrona y le paso la ruta donde quiero guardar los datos. 
async function main() {
  const nP = new productManager({path:'productos.json'})
  nP.reset()

  /* LLamo al método getproducts y nos devuelve un array vacío. Al principio me daba un error
  ya que el archivo productos.json estaba vacío entonces no había datos para parsear por 
  lo tanto le ingrese de forma manual un array vacío [] para corroborar el console.log*/
  console.log('1° consulta:', await nP.getProducts())

  
  // Llamo al método addProducts con los siguientes parámetros, el id se genera de forma automática 
  console.log('agregado:', await nP.addProducts({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
  }))

  console.log('agregado:', await nP.addProducts({
    title: 'producto prueba 1',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc124',
    stock: 50
  }))

  // La segunda consulta nos devuelve los productos agregados anteriormente.
  console.log('2° consulta:', await nP.getProducts())

  // Llamo al método getProductsById dentro de un console.log para buscar un producto por Id
  // sino encuentra coincidenca me devuelve un error detallando el mismo
  console.log('3° consulta:', await nP.getProductsById(2))
  
  // LLamo al método para actualizar un campo del producto, en este caso el precio. Por parámetro
  // le indico el Id y el el dato a actualizar.
  console.log('actualizado: ', await nP.updateProducts(1, { price: 100 }))

  // Llamo al método para eliminar un product. Por parámetro le paso el id del producto a eliminar
  console.log('borrado: ', await nP.deleteProducts(2))

}

main()