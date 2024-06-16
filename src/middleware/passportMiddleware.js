import passport from "passport" 
import { codigo } from "./config.js"

// export const authenticateLogin = (req, res, next) => {
//     passport.authenticate('login', { session: false }, (err, user, info) => {
//         if (err) {
//             if (err === 'Error al obtener el usuario. Error: El usuario o contraseña son incorrectos.') {
//                 let message = 'El usuario o contraseña son incorrectos.'
//                 return res.redirect(`/login?message=${encodeURIComponent(message)}`)
//             } else {
//                 return res.status(401).json({ message: 'Token no válido. Por favor, intente nuevamente.' })
//             }
//         }
//         if (!user) {
//             return res.status(401).json({ message: 'No autorizado. Por favor, inicie sesión.' })
//         }
//         req.user = user
//         next()
//     })(req, res, next)
// }

// export const authenticateResetContra = (req, res, next) => {
//     passport.authenticate('resetContra', { session: false }, (err, user, info) => {
//         if (info) {
//             if (info.message === 'jwt expired') {
                
//                 let message = 'El tiempo para restablecer la contraseña expiró.'
//                 res.redirect(`/api/recuperacion-contra?message=${encodeURIComponent(message)}`)
//             } else {
//                 return res.status(401).json({ message: 'Token no válido. Por favor, intente nuevamente.' })
//             }
//         }
//         if (!user) {
//             return res.status(401).json({ message: 'No autorizado. Por favor, inicie sesión.' })
//         }
//         req.user = user
//         next()
//     })(req, res, next)
// }

export const authenticateResetContra = (req, res, next) => {
    codigo('resetContra', req, res, next, `/api/recuperacion-contra?message=${encodeURIComponent('Contraseña no válida.')}`)
}

export const authenticateLogin = (req, res, next) => {
    codigo('login', req, res, next, `/login?message=${encodeURIComponent('El usuario o contraseña son incorrectos.')}`)
}

export const authenticateJWT = (req, res, next) => {
    codigo('jwt', req, res, next, `/login?message=${encodeURIComponent('Inicie sesión.')}`)
}

// // Middleware para autenticación con JWT
// export const authenticateJWT = passport.authenticate('jwt', { session: false })

// Middleware para autenticación con register
export const authenticateRegister = passport.authenticate('register', { session: false })

// Middleware para autenticación con github
export const authenticateGithub = passport.authenticate('github', { session: false })

// // Middleware para autenticación de Resetear Contraseña
// export const authenticateResetContra = passport.authenticate('resetContra', { session: false })

// // Middleware para autenticación con login
// export const authenticateLogin = passport.authenticate('login', { session: false })

// Middleware para autenticación de User
export const authenticateUser = passport.authenticate('user', { session: false })

// Middleware para autenticación de Admin
export const authenticateAdmin = passport.authenticate('admin', { session: false })

// Middleware para autenticación de Admin-Premium
export const authenticateAdminPremium = passport.authenticate('admin-premium', { session: false })