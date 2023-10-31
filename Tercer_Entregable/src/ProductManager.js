import fs from 'fs/promises'

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    // A este primer método por default le pasamos un parámetro con un objeto vacío, 
    // de esa forma devolverá el total de elemntos almacenados en el archivo. Si luego 
    // recibe un valor, ese mismo será la cantidad de productos a devolver por pantalla
    // Si el número ingresado esta fuera del rango devolverá un mensaje de error
    async getAll(query = {}) {
        const json = await fs.readFile(this.path, 'utf-8')  
        if ((query.limit) >= 1 && (query.limit) <= 10) {
            return JSON.parse(json).filter(p => p.id <= query.limit)

        } else if ((query.limit) < 0 || (query.limit) > 10) {
            throw new Error ("Por favor ingresar un numero del 1 a 10")

        }   
            return JSON.parse(json)
      }
    
    // Este método posee un id como parámetro y buscará el elemento cuyo id coincida 
    // con el id pasado en la consulta como argumento sino encuentra coincidencia lanzará un error 
    async getById(id) {
        const json = await fs.readFile(this.path,'utf-8')
        const productos = JSON.parse(json)
        const buscado = productos.find(p => p.id === id)
        if (!buscado) throw new Error (`no se encontró el producto con el id ${id}`)
        return buscado
    }
}