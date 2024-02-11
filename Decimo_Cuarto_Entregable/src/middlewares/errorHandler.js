import { TiposDeError } from "../models/errors/tiposDeError.js"

export function errorHandler(error, req, res, next) {
  if (error.type === TiposDeError.AUTH_ERROR) {
    res.status(401)
  } else if (error.type === TiposDeError.NOT_FOUND_ERROR) {
    res.status(404)
  } else {
    res.status(500)
  }
  console.log(error)

  res.json({
    status: 'error',
    message: error.message,
  })
}