import { Router } from 'express'
import passport from 'passport'
import { usuariosManager } from '../../models/user.js'
import { soloAdmins, soloLogueadosApi } from '../../middlewares/auth.js'
import { hashear } from '../../utils/criptografia.js'

export const usuariosRouter = Router()

usuariosRouter.post('/',
  passport.authenticate('register', {
    failWithError: true
  }),
  function (req, res) {
    res.status(201).json({ status: 'success', payload: req.user })
  },
  function (error, req, res, next) {
    res
      .status(400)
      .json({
        status: 'error',
        message: error.message
      })
  }
)
/* async (req, res) => {
  let creado
  try {

    req.body.password = hashear(req.body.password)
  
    creado = await usuariosManager.create(req.body)
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
  }
  const datosUsuario = {
    email: creado.email,
    nombre: creado.nombre,
    apellido: creado.apellido,
    rol: 'usuario'
  }

  req.login(datosUsuario, error => {
      if (error) {
        throw new Error('login failed')
      }
      res.status(201).json({ status: 'success', payload: creado })
    })

}) */

usuariosRouter.put('/', async function (req, res) {
  /* try {

    req.body.password = hashear(req.body.password)

    const actualizado = await usuariosManager.updateOne(
      { email: req.body.email },
      { $set: { password: req.body.password } },
      { new: true }
    )
    if (!actualizado) {
      return res.status(404).json({ status: 'error', messagge: 'usuario no encontrado' })
    }
    res.status(201).json({ status: 'success', payload: actualizado })
  } catch (error) {
    res.status(400).json({ status: 'error', messagge: error.messagge })
  }
}) */
  try {
    const actualizado = await usuariosManager.resetearContraseña(req.body.email, req.body.password)
    res.json({ status: 'success', payload: actualizado })
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message })
  }
})

usuariosRouter.get('/current', soloLogueadosApi, async (req, res) => {
  res.json({ status: 'success', payload: req.user })
})

usuariosRouter.get('/', soloAdmins, async (req, res) => {
  const usuarios = await usuariosManager.find().lean()
  res.json({ status: 'success', payload: usuarios })
})