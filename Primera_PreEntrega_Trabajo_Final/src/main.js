import express from "express";
import { PORT } from "./config.js";
import { apiRouter } from "./routers/apiRouters.js";

const app = express()

app.use(express.json())

app.use('/api', apiRouter)

app.use((err,req,res,next) => {
    res.json({
        status: 'error',
        descr: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Conectado a ${PORT}!`)
})