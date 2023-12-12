import { Router } from "express";

export const cookieRouter = Router()

cookieRouter.get('/setCookies', (req,res) => {
    // CoderCookie es el nombre, Esta es una cookie... es el value, maxAge es el tiemo de vida 
    res.cookie('CoderCookie', 'Esta es una cookie muy poderosa',{maxAge:10000}).send("cookie")
})

cookieRouter.get('/getCookies', (req,res) => {
    // obtenemos las req.cookies y las enviamos al ciente para corroborar que hay almacenado
    res.send(req.cookies)
})

cookieRouter.get('/deleteCookies', (req,res) => {
    res.clearCookie('CoderCookie').send('Cookie Removed')
})

cookieRouter.get('/setSignedCookie', (req,res) => {
    res.cookie('SignedCookie', "Esta es una cookie muy poderosa",{maxAge:10000,signed:true}).send('Cookie Firmada')
})

cookieRouter.get('/getSignedCookie', (req,res) => {
    // obtenemos las req.signedcookies y las enviamos al ciente para corroborar que hay almacenado
    res.send(req.signedCookies)
})