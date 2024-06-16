import { UserManager } from "../Dao/db/managers/usersManagerDB.js"
import { generaToken } from "../utils/tokenJWT.js"

//Instanciamos UserManager()
const user = new UserManager()

export const toggleUserRoleController = async (req, res) => {
    try {
        let uid = req.params.uid

        let usuarioCambiarRol = await user.updateUser(uid)

        let token = generaToken({firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email, cartId: req.user.cartId, role: req.user.role, _id: req.user._id })
        res.cookie(process.env.SECRETCOOKIE, token, { httpOnly: true })

        res.status(200).json(usuarioCambiarRol)
    } catch (error) {
        req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)

        res.status(500).send('Error interno del servidor')
    }
}