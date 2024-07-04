import { sessionControllerDTO } from "./dto/session.controller.dto.js"

export const getCurrentUser = async (req, res) => {
    try {
        // Retorna el usuario actual extraído de la solicitud filtrando sus datos sensibles
        let usuario = sessionControllerDTO(req.user)

        res.render('perfil', {
            'firstName': usuario.firstName,
            'email': usuario.email,
            "cartId": usuario.cartId,
            'role':usuario.role,
            "valor": true
        })
    } catch (error) {
        req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)
        
        res.status(500).send('Error interno del servidor')
    }
}
