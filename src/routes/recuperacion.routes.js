import express from "express"
import { authenticateResetContra } from "../middleware/passportMiddleware.js"
import { RecuperacionController } from "../controllers/recuperacion.controller.js"

const routerRecuperar = express.Router()

//Instanciamos RecuperacionController()
const recuperacionController = new RecuperacionController()

routerRecuperar.get('/', recuperacionController.homeRecuperaPassword)
routerRecuperar.post('/send-reset-email', recuperacionController.validarEmail)
routerRecuperar.get('/reset-password', recuperacionController.resetPass)
routerRecuperar.post('/reset-password', authenticateResetContra, recuperacionController.sendNewPassword)

export default routerRecuperar
