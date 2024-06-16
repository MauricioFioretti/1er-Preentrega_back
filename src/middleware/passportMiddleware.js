import passport from "passport" 
import { codigo } from "./config.js"

export const authenticateResetContra = (req, res, next) => {
    codigo('resetContra', req, res, next, `/api/recuperacion-contra?message=${encodeURIComponent('Contraseña no válida.')}`)
}

export const authenticateLogin = (req, res, next) => {
    codigo('login', req, res, next, `/login?message=${encodeURIComponent('El usuario o contraseña son incorrectos.')}`)
}

export const authenticateJWT = (req, res, next) => {
    codigo('jwt', req, res, next, `/login?message=${encodeURIComponent('Inicie sesión.')}`)
}

// Middleware para autenticación con register
export const authenticateRegister = passport.authenticate('register', { session: false })

// Middleware para autenticación con github
export const authenticateGithub = passport.authenticate('github', { session: false })

// Middleware para autenticación de User
export const authenticateUser = passport.authenticate('user', { session: false })

// Middleware para autenticación de Admin
export const authenticateAdmin = passport.authenticate('admin', { session: false })

// Middleware para autenticación de Admin-Premium
export const authenticateAdminPremium = passport.authenticate('admin-premium', { session: false })