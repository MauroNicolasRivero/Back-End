import express from "express";
import { PORT } from "./config.js";
import { apiRouter } from "./routers/api.Router.js";

const app = express()

app.use((err,req,res,next) => {
    res.json({
        status: 'error',
        descr: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Conectado al puerto ${PORT}!`)
})

app.use(express.json())
app.use('/api', apiRouter)

 
  
  