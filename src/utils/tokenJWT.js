import jwt from "jsonwebtoken"

export function generaToken(usuario) {
    return jwt.sign(
        usuario,
        process.env.SECRETJWT,
        { expiresIn: '24h' }
    )
}