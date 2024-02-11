import { MODE } from '../config/config.js'

import winston from 'winston'

 const levels = {
     fatal: 0,
     error: 1,
     warning: 2,
     info: 3,
     http: 4,
     debug: 5,
 }

const winstonLoggerDev = winston.createLogger({
  levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
    })
  ]
})

const winstonLoggerProd = winston.createLogger({
  levels,
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.File({
      level: "error",
      filename: 'errors.log'
    })
  ]
})

export let logger
if (MODE === 'prod') {
  logger = winstonLoggerProd
} else {
  logger = winstonLoggerDev
}
