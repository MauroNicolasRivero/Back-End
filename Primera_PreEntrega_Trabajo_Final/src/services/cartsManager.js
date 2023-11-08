import { Carts } from "../models/carts.js";
import { carts_json } from "../config.js";
import fs from 'fs/promises'

export class cartsManager{
    static idCarts = 1
    constructor(path) {
        this.path = path
        this.carts = []
    }
    static getIdNewCarts() {
        return cartsManager.idCarts++
    }

    async writeCarts() {
        const cartsJson = JSON.stringify(this.Carts, null, 2)
        await fs.writeFile(this.path, cartsJson)
    }

    async addCarts(datos) {
        const json = await fs.readFile(this.path, 'utf-8')
        const idNvo = cartsManager.getIdNewCarts()
        const cartsNuevo = new Carts({ id: idNvo, datos })
        const codeRepeat = this.carts.find(p => p.id === cartsNuevo.id)
        if (codeRepeat) {
          throw new Error(`El id ${cartsNuevo.id} ya esta asignado, por favor verificar información`)
        }
        this.carts.push(cartsNuevo)
        await this.writeCarts()
        return cartsNuevo
    }

}