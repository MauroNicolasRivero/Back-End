import { Router } from 'express'
import { usuariosManager } from '../../models/user.js'

export const sesionesRouter = Router()

// login

sesionesRouter.get('/login', function loginView(req, res) {
  res.render('login.handlebars', {
    pageTitle: 'Login',
  })
})

sesionesRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    let datosUsuario
    // validación para redireccionar si el usuario no esta registrado 
    //let cantidadUsuarios = await usuariosManager.estimatedDocumentCount()
    
    //if(cantidadUsuarios == 0) {
      //return res.redirect('/register')
    //}

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      datosUsuario = {
        email: 'admin',
        nombre: 'admin',
        apellido: 'admin',
        rol: 'admin'
      }
    } else {
      const usuario = await usuariosManager.findOne({ email }).lean()
      if (!usuario) {
        return res.redirect('/login')
      }

      // deberia encriptar la recibida y comparar con la guardada que ya esta encriptada
      if (password !== usuario.password) {
        return res.redirect('/login')
      }

      datosUsuario = {
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: 'usuario'
      }
    }

    req.session['user'] = datosUsuario
    res.redirect('/productos')
  } catch (error) {
    res.redirect('/login')
  }
})

// logout

sesionesRouter.post('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login')
  })
})