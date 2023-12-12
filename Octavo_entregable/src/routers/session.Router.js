/*
import { Router } from "express";

export const sessionRouter = Router()

sessionRouter.get('/session', (req,res) => {
    // si al conectarse la sesion ya existe, entonces aumentar el contador
    if(req.session['counter']) {
        req.session['counter']++
        res.send(`Se ha visitado el sitio ${req.session['counter']} veces.`)
    } else {
        // Si no hay aun una sesion para el usuario, entonces inicializar en 1
        req.session['counter'] = 1
        res.send('¡Bienvenid@!')
    }
})

sessionRouter.get('/login', (req,res) => {
    // http://localhost:8080/login?username=Mauro&password=12345
    const {username,password} = req.query
    if (username !== 'Mauro' || password !== '12345') {
        return res.send('login failed')
    }
    req.session.user = username
    req.session.admin = true
    res.send('logind success!')
})

function auth(req,res,next) { // funcion para autenticar si un user es admin
    if(req.session?.user === "Mauro" && req.session?.admin) {
        return next()
    }
    return res.status(401).send('error de autorizacion!')
}

sessionRouter.get('/logout', (req,res) => {
    req.session.destroy( err => {
        if(!err) res.send('Logout ok!')
        else res.send({status: 'logout ERROR', body:err})
    })
})

sessionRouter.get('/private', auth,(req,res) => {
    res.send('Si estas viendo este mensaje es porque ya te logueaste!')
})
*/