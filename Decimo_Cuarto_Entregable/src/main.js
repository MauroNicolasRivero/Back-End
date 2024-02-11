import { app } from './app/app.js'
import { PORT } from './config/config.js'
import { logger } from './utils/logger.js'

app.listen(PORT, () => {
  logger.info(`servidor escuchando peticiones en puerto: ${PORT}`)
})