import bcrypt from "bcrypt"

//Registro
export function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

//Login
export function isValidatePassword(password, user){
    return bcrypt.compareSync(password, user)
}
