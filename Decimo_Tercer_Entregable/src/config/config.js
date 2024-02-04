import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()
program
  .option('-p, --prod', 'entorno de ejecucion', false)
  .parse()

const { prod } = program.opts()

dotenv.config({
  path: prod ? './src/config/prod.env' : './src/config/dev.env'
})

export const PORT = process.env.PORT
export const MODE = process.env.MODE
export const CNX_STR = process.env.CNX_STR
export const JWT_PRIVATE_KEY = 'jwtsecret'
export const COOKIE_SECRET = 'cookiesecret'

// Login con github
export const githubAppId = '715658'
export const githubClienteId = 'Iv1.eee778e1c4cd8834'
export const githubClientSecret = '0b91d695d2e23640b13e001fbc58150dbe6d9a7d'
export const githubCallbackUrl = 'http://localhost:8080/api/sesiones/githubcallback'

export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASS = process.env.EMAIL_PASS