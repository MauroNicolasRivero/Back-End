import { userDao } from "../daos/index.js"
import { appendJwtAsCookie } from '../middlewares/authentication.js'
import { adminsOnly, usersOnly } from '../middlewares/authorization.js'
import passport from 'passport'

export async function postController (req,res,next) {
    passport.authenticate('localRegister', {
        failWithError: true,
        session: false
      }),
      appendJwtAsCookie,
      async (req, res, next) => {
        res['successfullPost'](req.user)
    }
}

export async function getCurrentController (req,res,next) {
    passport.authenticate('jwtAuth', {
        failWithError: true,
        session: false
      }),
      usersOnly,
      async (req, res, next) => {
        res['successfullGet'](req.user)
    }
}

export async function getController (req,res,next) {
    passport.authenticate('jwtAuth', {
        failWithError: true,
        session: false,
      }),
      adminsOnly,
      async (req, res, next) => {
        const usuarios = await userDao.find({}, { password: 0 }).lean()
        res['successfullGet'](usuarios)
    }
}