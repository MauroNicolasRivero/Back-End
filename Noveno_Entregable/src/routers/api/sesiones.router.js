import { Router } from 'express'
import passport from 'passport'
import { soloLogueadosApi } from '../../middlewares/auth.js'
import { hasheadasSonIguales } from '../../utils/criptografia.js'
import { usuariosManager } from '../../models/user.js'

export const sesionesRouter = Router()

sesionesRouter.post('/',
  passport.authenticate('login', {
    failWithError: true
  }),
  function (req, res) {
    res.status(201).json({ status: 'success', payload: req.user })
  },
  function (error, req, res, next) {
    res
      .status(401)
      .json({
        status: 'error',
        message: 'login failed'
      })
  }
)
/*   
  async (req, res) => {
  const { email, password } = req.body

  let datosUsuario

  if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    datosUsuario = {
      email: 'admin',
      nombre: 'admin',
      apellido: 'admin',
      rol: 'admin'
    }
  } else {
    let usuario
    try {
      usuario = await usuariosManager.findOne({ email }).lean()
    } catch (error) {
      // posible motivo de falla: erro de la db!
      console.log(error)
      return res.status(500).json({ status: 'error', messagge: error.messagge})
    }

    if (!usuario) {
      return res.status(400).json({ status: 'error', message: 'login failed' })
    }

    if (!hasheadasSonIguales(password,usuario.password)) {
      return res.status(400).json({status: 'error', messagge: 'login failed'})
    }

    datosUsuario = {
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: 'usuario'
    }
  }

  if (!datosUsuario) {
    return res.status(400).json({status: 'error', messagge: 'login failed'})
  }

  //req.session['user'] = datosUsuario
  //res.status(201).json({ status: 'success', message: 'login success' })
  
  req.login(datosUsuario,error => {
    if (error) {
      throw new Error('login failed')
    }
    res.redirect('/profile')
  })
}) */

sesionesRouter.get('/current',
  soloLogueadosApi,
  function (req, res) {
    return res.json(req.user)
  })
/*  (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user)
  }
  res.status(400).json({ status: 'error', message: 'no hay una sesion iniciada' })
}) */

sesionesRouter.delete('/current', (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ status: 'logout error', body: err })
    }
    res.json({ status: 'success', message: 'logout OK' })
  })
})