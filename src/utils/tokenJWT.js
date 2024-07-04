import jwt from "jsonwebtoken"

export function generaToken(usuario) {
    return jwt.sign(
        usuario,
        process.env.SECRETJWT,
        { expiresIn: '24h' }
    )
}

export function generaTokenReset(usuario) {
    return jwt.sign(
        { email: usuario },
        process.env.SECRETJWT,
        { expiresIn: '1h' }
    )
}

