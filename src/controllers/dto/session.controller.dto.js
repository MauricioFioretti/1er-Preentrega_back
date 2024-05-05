export function sessionControllerDTO(usuario) {
    delete usuario._id
    delete usuario.iat
    delete usuario.exp
    return usuario
}