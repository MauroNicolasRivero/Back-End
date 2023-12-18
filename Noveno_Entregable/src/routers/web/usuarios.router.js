import { Router } from 'express'
import passport from 'passport';
import { usuariosManager } from '../../models/user.js'
import { soloLogueadosWeb } from '../../middlewares/auth.js'
import { productsManager } from "../../services/productsManager.js";
//import { hashear } from '../../utils/criptografia.js';

export const usuariosRouter = Router()

// registro

usuariosRouter.get('/register', function registerView(req, res) {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

usuariosRouter.post('/register',
  passport.authenticate('register', {
    successRedirect: '/profile',
    failureRedirect: '/register',
  })
)

// reestablecer contraseña

usuariosRouter.get('/resetpassword', function RegisterdView(req, res) {
  res.render('resetpassword.handlebars', {
    pageTitle: 'Restablecer contraseña'
  })
})

usuariosRouter.post('/resetpassword', async function registrarUsuario(req, res) {
  try {
    await usuariosManager.resetearContraseña(req.body.email, req.body.password)
    res.redirect('/login')
  } catch (error) {
    console.log(error)
    res.redirect('/resetpassword')
  }
})

// perfil

usuariosRouter.get('/profile', soloLogueadosWeb, function profileView(req, res) {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    user: req.user,
    //user: req.session['user']
  })
})

// productos

usuariosRouter.get('/productos', async (req, res) => {
  const productos = await productsManager.getAll()
  res.render('productos', {
    pageTitle: 'Productos',
    user: req.user,
    //user: req.session['user'],
    //esAdmin: req.session['user'].nombre == 'admin',
    hayProductos: productos.length > 0,
    productos
  })
})