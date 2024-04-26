import { Router } from "express"
import { getCurrentUser } from "../controllers/session.controller.js"
import { authenticateJWT } from "../middleware/passportMiddleware.js"

const routerSession = Router()

// Ruta para obtener el perfil del usuario actual
routerSession.get('/current', authenticateJWT, getCurrentUser)

export default routerSession