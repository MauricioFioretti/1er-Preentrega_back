import { UsersService } from "../services/views.service.js"

//Instanciamos UsersService()
const user = new UsersService()

export class ViewsController {
    getUsersController = async (req, res) => {
        try {
            const usuarios = await user.getUsers()
            res.send(usuarios)
        } catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)

            res.status(500).send('Error interno del servidor')
        }
    }

    renderRegister = async (req, res) => {
        res.render('register')
    }

    renderLogin = async (req, res) => {
        let message = req.query.message
        let error = req.query.error
        let alertScript = ''

        if (message) {
            alertScript = `<script>alert('${message}')</script>`
        } else if (error) {
            alertScript = `<script>alert('${error}')</script>`
        }

        res.render('login', { alertScript })
    }

    redirec = async (req, res) => {
        res.redirect(`/api/products`)
    }
}