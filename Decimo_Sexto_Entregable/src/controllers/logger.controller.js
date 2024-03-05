export async function getLoggerController(req,res,next) {
    req.logger.fatal('Esto es un fatal error')
    req.logger.error('Esto es un error')
    req.logger.warning('Esto es un warning')
    req.logger.info('Esto es una info')
    req.logger.http('Entré al get de loggerTest')
    req.logger.debug('El pid que vino es:' + '1234567890')
}  