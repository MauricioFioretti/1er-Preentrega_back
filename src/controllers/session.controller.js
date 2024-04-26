export const getCurrentUser = async (req, res) => {
    try {
        // Retorna el usuario actual extraído de la solicitud
        res.send(req.user)
    } catch (error) {
        res.status(500).send('Error interno del servidor')
    }
}
