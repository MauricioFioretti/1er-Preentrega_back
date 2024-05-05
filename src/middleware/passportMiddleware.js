import passport from "passport"

// Middleware para autenticación con JWT
export const authenticateRegister = passport.authenticate('register', { session: false })

// Middleware para autenticación con JWT
export const authenticateLogin = passport.authenticate('login', { session: false })

// Middleware para autenticación con JWT
export const authenticateJWT = passport.authenticate('jwt', { session: false })

// Middleware para autenticación con JWT
export const authenticateGithub = passport.authenticate('github', { session: false })

// Middleware para autenticación de User
export const authenticateUser = passport.authenticate('user', { session: false })

// Middleware para autenticación de Admin
export const authenticateAdmin = passport.authenticate('admin', { session: false })

