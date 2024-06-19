import express from "express"
import { UserManager } from "../Dao/db/managers/usersManagerDB.js"
import { authenticateResetContra } from "../middleware/passportMiddleware.js"
import { generaTokenReset } from "../utils/tokenJWT.js"
import { transporter } from "../config/nodemailer.js"

//Instanciamos UserManager()
const user = new UserManager()

const routerRecuperar = express.Router()

routerRecuperar.get('/', (req, res) => {
    let message = req.query.message
    let error = req.query.error
    let alertScript = ''

    if (message) {
        alertScript = `<script>alert('${message}')</script>`
    } else if (error) {
        alertScript = `<script>alert('${error}')</script>`
    }

    res.render('recuperaContra', { alertScript })
})

routerRecuperar.post('/send-reset-email', async (req, res) => {
    const email = req.body.email

    let respuestaEmail = await user.validateEmail(email)

    if (respuestaEmail.success) {
        let token = generaTokenReset(email)
        res.cookie(process.env.SECRETCOOKIE, token, { httpOnly: true })

        const resetLink = `http://localhost:${process.env.PORT}/api/recuperacion-contra/reset-password`
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
        return req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} - message: ${respuestaEmail.message} - error: ${respuestaEmail.error}`)
    }
})

routerRecuperar.get('/reset-password', authenticateResetContra, (req, res) => {
    let message = req.query.message
    let error = req.query.error
    let alertScript = ''

    if (message) {
        alertScript = `<script>alert('${message}')</script>`
    } else if (error) {
        alertScript = `<script>alert('${error}')</script>`
    }

    res.render('reset-contra', { alertScript })
})

routerRecuperar.post('/reset-password', authenticateResetContra, async (req, res) => {
    const newPassword = req.body.password
    const email = req.user.email
    let respuestaAddUser = await user.updatePassword(email, newPassword)

    if (respuestaAddUser.success) {
        res.redirect(`/login`)
    } else {
        res.redirect(`/api/recuperacion-contra/reset-password?error=${encodeURIComponent(respuestaAddUser.message)}`)
    }
})

export default routerRecuperar
