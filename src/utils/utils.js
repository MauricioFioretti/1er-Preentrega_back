import jwt from "jsonwebtoken"

export function generaToken(usuario){
    return jwt.sign(
        usuario,
        'coderSecret',
        { expiresIn: '24h' }
    )
}