import { sessionControllerDTO } from "./dto/session.controller.dto.js"

export const getCurrentUser = async (req, res) => {
    try {
        // Retorna el usuario actual extraído de la solicitud filtrando sus datos sensibles
        res.send( sessionControllerDTO(req.user) )
    } catch (error) {
        res.status(500).send('Error interno del servidor')
    }
}
