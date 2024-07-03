import { generaTokenReset } from "../utils/tokenJWT.js"
import { transporter } from "../config/nodemailer.js"
import { UserManager } from "../Dao/db/managers/usersManagerDB.js"

const user = new UserManager()

export class RecuperacionController {
    async homeRecuperaPassword(req, res) {
        let message = req.query.message
        let error = req.query.error
        let alertScript = ''

        if (message) {
            alertScript = `<script>alert('${message}')</script>`
        } else if (error) {
            alertScript = `<script>alert('${error}')</script>`
        }

        res.render('recuperaContra', { alertScript })
    }

    async validarEmail(req, res) {
        const email = req.body.email

        let respuestaEmail = await user.validateEmail(email)

        if (respuestaEmail.success) {
            let token = generaTokenReset(email)
            res.cookie(process.env.SECRETCOOKIE, token, { httpOnly: true })

            const resetLink = `process.env.HOST/api/recuperacion-contra/reset-password`
            const mailOptions = {
                from: 'Coder test <mauriciofioretti@gmail.com>',
                to: email,
                subject: 'Recuperación de contraseña',
                html: `<p>Haga click en el siguiente enlace para restablecer su contraseña:</p>
               <a href="${resetLink}">Restablecer contraseña</a>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - message: ${error}`)
                }
                req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - Correo Enviado: ${info.response}`)
                res.render('send-email')
            })
        } else {
            req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - message: ${respuestaEmail.message} - error: ${respuestaEmail.error}`)
            return res.redirect(`/login?message=${encodeURIComponent('El email no existe.')}`)
        }
    }

    async resetPass(req, res) {
        let message = req.query.message
        let error = req.query.error
        let alertScript = ''

        if (message) {
            alertScript = `<script>alert('${message}')</script>`
        } else if (error) {
            alertScript = `<script>alert('${error}')</script>`
        }

        res.render('reset-contra', { alertScript })
    }

    async sendNewPassword(req, res) {
        const newPassword = req.body.password
        const email = req.user.email
        let respuestaAddUser = await user.updatePassword(email, newPassword)

        if (respuestaAddUser.success) {
            res.redirect(`/login`)
        } else {
            res.redirect(`/api/recuperacion-contra/reset-password?error=${encodeURIComponent(respuestaAddUser.message)}`)
        }
    }
}