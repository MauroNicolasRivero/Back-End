import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
  res.render('Home', { titulo: 'Inicio' })
})

webRouter.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts', { titulo: 'Real Time' })
})