import express from "express"

const routerLogger = express.Router()

routerLogger.get('/loggerTest', (req, res)=>{
    req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error: Error`)

    req.logger.fatal(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    
    res.status(200).send("Ruta de prueba Logger")
})

export default routerLogger