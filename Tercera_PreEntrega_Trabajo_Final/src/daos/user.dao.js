import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'
import { hasheadasSonIguales, hashear } from '../utils/criptografia.js'
import { emailService } from '../services/email/factory.email.service.js'

const collection = 'users'

const userSchema = new Schema({
  _id: { type: String, default: randomUUID },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  displayName: { type: String, required: true },
  rol: { type: String, default: 'user' }
}, 
{
    strict: 'throw',
    versionKey: false,
    }
);

const usersModel = model(collection,userSchema)

// -----------------------------------------------

export class UserDao {

    async register(userData) {
      userData.password = hashear(userData.password)
      const user = await usersModel.create(userData)
      return user.toObject()
    }

    async login({ username, password }) {
      const user = await usersModel.findOne({ username })
      if (!user) { throw new Error('authentication error') }
      if (!hasheadasSonIguales({
        recibida: password,
        almacenada: user.password
      })) {
        throw new Error('authentication error')
      }
      // Aca voy a probar lo del email
      emailService.send(
      user.email,
      'Nuevo usuario logeado',
      'Le informamos que se hemos detectado un nuevo login en su App')
      // Aca voy a probar lo del email
      return user.toObject()
    }
}   