import { UsersService } from "../services/views.service.js"
import { generaToken } from "../utils/tokenJWT.js"
import { filterInfoUsers } from "./dto/infoUsers.controller.dto.js"
import { transporter } from "../config/nodemailer.js"

//Instanciamos UsersService()
const user = new UsersService()

export class UsersController {
    toggleUserRoleController = async (req, res) => {
        try {
            let uid = req.params.uid

            let usuarioCambiarRol = await user.updateUser(uid)
            req.user.role = usuarioCambiarRol.role

            res.clearCookie(process.env.SECRETCOOKIE)
            let token = generaToken({ firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email, cartId: req.user.cartId, role: req.user.role, _id: req.user._id })
            res.cookie(process.env.SECRETCOOKIE, token, { httpOnly: true })

            res.status(200).json(usuarioCambiarRol)
        } catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)

            res.status(500).send('Error interno del servidor')
        }
    }

    getUsers = async (req, res) => {
        try {
            let usuarios = await user.getUsers()
            let filterInfoUser = filterInfoUsers(usuarios)

            res.status(200).json(filterInfoUser)
        } catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)

            res.status(500).send('Error interno del servidor')
        }
    }

    modifyUsers = async (req, res) => {
        try {
            let usuarios = await user.getUsers()
            res.render('modifyUsers', {
                "array": usuarios
            })

        } catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)

            res.status(500).send('Error interno del servidor')
        }
    }

    deleteUsers = async (req, res) => {
        try {
            let usuarios = await user.getUsers()
            let nowTime = new Date()
            let usersDelete = []

            usuarios.forEach(async element => {
                // Convertir lastLogin a un objeto Date
                let lastLoginDate = new Date(element.lastLogin)

                // Calcular la diferencia en milisegundos
                let timeDifference = nowTime - lastLoginDate

                // Convertir la diferencia a un formato legible (por ejemplo, días, horas, minutos)
                let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
                let hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                let minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))

                if (daysDifference >= 2 && element.role !== 'Admin') {
                    usersDelete.push(element)
                    await user.deleteUser(element._id)

                    const mailOptions = {
                        from: 'Coder test <mauriciofioretti@gmail.com>',
                        to: element.email,
                        subject: 'Eliminación de cuenta',
                        html: `<p>Se eliminó su cuenta de la base de datos por inactividad. Para ingresar, se deberá registrar nuevamente. </p>`
                    }

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - message: ${error}`)
                        } else {
                            req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Correo Enviado: ${info.response}`)
                        }
                    })
                }
            })

            let filterInfoUser = filterInfoUsers(usersDelete)
            res.status(200).json(filterInfoUser)
        } catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)

            res.status(500).send('Error interno del servidor')
        }
    }

    deleteUser = async (req, res) => {
        try {
            let uid = req.params.uid
            let email = req.params.email

            //Verificar que el usuario a eliminar no es un Admin
            let admin = await user.getUserById(uid)
            if (admin.role === "Admin") {
                return res.redirect(`/api/users/modify`)
            }

            await user.deleteUser(uid)

            const mailOptions = {
                from: 'Coder test <mauriciofioretti@gmail.com>',
                to: email,
                subject: 'Eliminación de cuenta',
                html: `<p>Un Administrador eliminó su cuenta de la base de datos. Para ingresar, se deberá registrar nuevamente. </p>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - message: ${error}`)
                } else {
                    req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Correo Enviado: ${info.response}`)
                }
            })

            return res.redirect(`/api/users/modify`)
        }

        catch (error) {
            req.logger.error(`${req.method} ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Error interno del servidor - Error: ${error.message}`)

            res.status(500).send('Error interno del servidor')
        }
    }
}