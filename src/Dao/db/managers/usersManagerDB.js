import { User } from "../models/users.modelDB.js"
import { createHash, isValidatePassword } from '../../../utils/bcrypt.js'
import { v4 as uuidv4 } from 'uuid'
import { CartsManager } from "./cartManagerDB.js"
import { generateUserEmailErrorInfo, generateUserErrorInfo } from "../../../services/errors/messages/userCreationError.message.js"
import EErrors from "../../../services/errors/errors-enum.js"
import CustomError from "../../../services/errors/customError.js"

const carts = new CartsManager()
// const customError = new CustomError()

export class UserManager {

    // Método para agregar un nuevo usuario a la bd.
    async addUser(newUser) {
        //Hasheo de la password, creacion del carrito y el usuario
        newUser.password = createHash(newUser.password)
        newUser.cartId = uuidv4()
        let email = newUser.email
        let firstName = newUser.firstName

        if (!newUser.firstName || !newUser.email) {
            //Custom error
            CustomError.createError({
                name: 'User creation Error',
                cause: generateUserErrorInfo(firstName, email),
                message: 'Error tratando de crear el usuario',
                code: EErrors.INVALID_TYPE_ERROR
            })
        }

        let busquedaPorEmail = await User.findOne({ email }).lean().exec()

        if (!busquedaPorEmail) {
            await carts.addCart(newUser.cartId)
            await User.create(newUser)
            return { success: true, message: `El usuario ${newUser.user} ha sido agregado correctamente` }
        } else {
            //Custom error
            CustomError.createError({
                name: 'User creation Error',
                cause: generateUserEmailErrorInfo(email),
                message: 'Error tratando de crear el usuario',
                code: EErrors.DATABASE_ERROR
            })
        }
    }

    // Método para obtener todos los usuarios.
    async getUsers() {
        try {
            return await User.find()
        }
        catch (error) {
            // Captura y manejo de errores durante la peticion de los usuarios.
            return { success: false, message: `Error al obtener los usuarios. `, error: error }
        }
    }

    // Método para obtener un usuario segun cuenta local.
    async getUserByEmail(email, password) {
        try {
            let busquedaPorEmail = await User.findOne({ email }).lean().exec()

            if (busquedaPorEmail && isValidatePassword(password, busquedaPorEmail.password)) {
                delete busquedaPorEmail.password //Eliminamos la password para no enviar datos sensibles al front.
                return { success: true, message: `El usuario con email: ${email} se encontró exitosamente.`, data: busquedaPorEmail }
            } else {
                throw new Error(`El usuario o contraseña son incorrectos.`)
            }
        } catch (error) {
            // Captura y manejo de errores durante la obtención de un usuario por email y contra.
            return { success: false, message: `Error al obtener el usuario. `, error: error }
        }
    }

    // Método para verificar si existe un email en la db.
    async validateEmail(email) {
        try {
            let busquedaEmail = await User.findOne({ email }).lean().exec()

            if (!busquedaEmail) {
                throw new Error(`El usuario no existe.`)
            } else {
                return { success: true, message: `El usuario con email: ${email} se encontró exitosamente.` }
            }
        } catch (error) {
            // Captura y manejo de errores durante la obtención de un usuario por email y contra.
            return { success: false, message: `Error al obtener el usuario. `, error: error }
        }
    }

    // Método para actualizar password.
    async updatePassword(email, newPassword) {
        try {
            let busquedaPorEmail = await User.findOne({ email }).lean().exec()

            if (isValidatePassword(newPassword, busquedaPorEmail.password)) {
                return { success: false, message: 'No se puede colocar la misma contraseña.' }
            }

            let hashedPassword = createHash(newPassword)
            let resultadoActualizacion = await User.updateOne({ email }, { password: hashedPassword }).lean().exec()

            if (!resultadoActualizacion) {
                throw new Error(`Ocurrió un problema al actualizar la contraseña.`)
            } else {
                return { success: true, message: `El usuario con email: ${email} actualizó la contraseña exitosamente.` }
            }
        } catch (error) {
            // Captura y manejo de errores durante la obtención de un usuario por email y contra.
            return { success: false, message: `Error al actualizar la contraseña. `, error: error }
        }
    }

    // Método para actualizar rol de usuario.
    async updateUser(uid) {
        try {

            let busquedaPorId = await User.findById(uid)

            if(busquedaPorId.role === 'User'){
                await User.updateOne({ _id: uid }, {role: 'Premium'})
            } else if (busquedaPorId.role === 'Premium'){
                await User.updateOne({ _id: uid }, {role: 'User'})
            }

            return await User.findById(uid)

        } catch (error) {
            // Captura y manejo de errores
            return { success: false, message: `Error al actualizar el rol de usuario. `, error: error }
        }
    }


    // Método para obtener un usuario de github.
    async getUserByGithub(profile) {
        try {
            let email = profile.email
            let userDeGithub

            //Buscamos el usuario segun los 2 email posibles
            if (!email) {
                //si no tiene email, directamente crea el email con el perfil.id y lo busca para saber si existe en la db.
                email = profile.id + '@gmail.com'
                userDeGithub = await User.findOne({ email }).lean().exec()
            } else {
                userDeGithub = await User.findOne({ email }).lean().exec()
                //Aca muy importante, si tiene email, puede ser que lo haya agregado recientemente en github, pero que el ya se haya registrado anteriormente en el sitio cuando no tenia email, por tanto el usuario ya existe en la db con el email generado por el sitio.
                if (!userDeGithub) {
                    email = profile.id + '@gmail.com'
                    userDeGithub = await User.findOne({ email }).lean().exec()
                }
            }

            if (!userDeGithub) {
                //Agregamos el usuario a la db y lo buscamos nuevamente
                let email = (await this.addUserByGithub(profile)).email
                userDeGithub = await User.findOne({ email }).lean().exec()
            }

            delete userDeGithub.password //Eliminamos la password para no enviar datos sensibles al front.
            return { success: true, message: `El usuario con email: ${email} se encontró exitosamente.`, data: userDeGithub }

        } catch (error) {
            // Captura y manejo de errores durante la obtención de un usuario por email y contra.
            return { success: false, message: `Error al obtener el usuario. `, error: error }
        }
    }

    // Método para agregar un usuario de github.
    async addUserByGithub(profile) {
        try {
            let email = profile.email
            let firstName = profile.name
            let cartId = uuidv4()
            if (!email) { email = profile.id + '@gmail.com' }
            if (!firstName) { firstName = profile.login }

            //Agregamos el usuario y el carrito a la db
            await User.create({ firstName, email, password: createHash('passwordGithub123.'), cartId })
            await carts.addCart(cartId)

            return { success: true, message: `El usuario se agrego exitosamente.`, email: email }
        } catch (error) {
            // Captura y manejo de errores durante la obtención de un usuario por email y contra.
            return { success: false, message: `Error al obtener el usuario. `, error: error }
        }
    }

    // Método para obtener un producto por su ID.
    async getUserById(id) {
        try {
            return await User.findById(id)
        } catch (error) {
            return 'Usuario no encontrado'
        }
    }
}

// Exportación de la clase ProductManager para su uso en otros módulos.
export default { UserManager }
