import { Router } from 'express'
import { usuariosManager } from '../../models/user.js'
import { soloLogueadosWeb } from '../../middlewares/sesiones.js'
import { productsManager } from "../../services/productsManager.js";

export const usuariosRouter = Router()

// registro

usuariosRouter.get('/register', function registerView(req, res) {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})


usuariosRouter.post('/register', async function registrarUsuario(req, res) {
  try {
    await usuariosManager.create(req.body)
    res.redirect('/login')
  } catch (error) {
    res.redirect('/register')
  }
})

// perfil

usuariosRouter.get('/profile', soloLogueadosWeb, function profileView(req, res) {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    user: req.session['user']
  })
})

// productos

usuariosRouter.get('/productos', async (req, res) => {
  const productos = await productsManager.getAll()
  res.render('productos', {
    pageTitle: 'Productos',
    user:req.session['user'],
    esAdmin: req.session['user'].nombre == 'admin',
    hayProductos: productos.length > 0,
    productos
  })
})