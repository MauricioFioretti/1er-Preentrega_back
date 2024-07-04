import passport from "passport"
import { codigo } from "./config.js"

// Middleware para autenticación con register
export const authenticateRegister = (req, res, next) => {
    codigo('register', req, res, next, `/login?message=${encodeURIComponent('Inicie sesión.')}`)
}

// Middleware para autenticación con login
export const authenticateLogin = (req, res, next) => {
    codigo('login', req, res, next, `/login?message=${encodeURIComponent('El usuario o contraseña son incorrectos.')}`)
}

// Middleware para autenticación de resetContra
export const authenticateResetContra = (req, res, next) => {
    codigo('resetContra', req, res, next, `/api/recuperacion-contra?message=${encodeURIComponent('Contraseña no válida o el token expiró.')}`)
}  

// Middleware para autenticación con JWT
export const authenticateJWT = (req, res, next) => {
    codigo('jwt', req, res, next, `/login?message=${encodeURIComponent('Inicie sesión.')}`)
}

export const authenticateUser = passport.authenticate('user', { session: false })
// Middleware para autenticación de User
// export const authenticateUser = (req, res, next) => {
//     codigo('user', req, res, next, `/login?message=${encodeURIComponent('Inicie sesión.')}`)
// }

export const authenticateGithub = passport.authenticate('github', { session: false })
// Middleware para autenticación con github
// export const authenticateGithub = (req, res, next) => {
//     codigo('github', req, res, next, `/login?message=${encodeURIComponent('Inicie sesión.')}`)
// }

// export const authenticateAdmin = passport.authenticate('admin', { session: false })
// Middleware para autenticación de Admin
export const authenticateAdmin = (req, res, next) => {
    codigo('admin', req, res, next, `/login?message=${encodeURIComponent('Inicie sesión.')}`)
}

export const authenticateAdminPremium = passport.authenticate('admin-premium', { session: false })
// Middleware para autenticación de Admin-Premium
// export const authenticateAdminPremium = (req, res, next) => {
//     codigo('admin-premium', req, res, next, `/login?message=${encodeURIComponent('Inicie sesión.')}`)
// }









