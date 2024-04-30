import { User } from "../models/users.modelDB.js"
import { createHash, isValidatePassword } from '../../../utils/bcrypt.js'
import { v4 as uuidv4 } from 'uuid'
import { CartsManager } from "./cartManagerDB.js"

const carts = new CartsManager()

export class UserManager {

    // Método para agregar un nuevo usuario a la bd.
    async addUser(newUser) {
        try {
            //Hasheo de la password, creacion del carrito y el usuario
            newUser.password = createHash(newUser.password)
            newUser.cartId = uuidv4()
            await carts.addCart(newUser.cartId)
            await User.create(newUser)

            return { success: true, message: `El usuario ${newUser.user} ha sido agregado correctamente` }
        }
        catch (error) {
            // Captura y manejo de errores durante la adición de un usuario.
            return { success: false, message: `Error al agregar el usuario. `, error: error }
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

    // Método para obtener un producto por su ID.
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

    // Método para obtener un producto por su ID.
    async getUserByGithub(profile) {
        try {
            let email = profile.email
            let firstName = profile.name
            if (!email) { email = profile.id + '@gmail.com' }
            if (!firstName) { firstName = profile.login }

            let userDeGithub = await User.findOne({ email }).lean().exec()
            if (!userDeGithub) {
                //Agregamos el usuario y el carrito a la db
                userDeGithub = await User.create({ firstName, email, password: createHash('passwordGithub123.'), cartId: uuidv4() })
                await carts.addCart(userDeGithub.cartId)

                userDeGithub = userDeGithub.toObject() //Transformamos el objeto de Mongo en un objeto plano de js.
                delete userDeGithub.password //Eliminamos la password para no enviar datos sensibles al front.

                return { success: true, message: `El usuario con email: ${email} se encontró exitosamente.`, data: userDeGithub }
            } else {
                delete userDeGithub.password //Eliminamos la password para no enviar datos sensibles al front.
                return { success: true, message: `El usuario con email: ${email} se encontró exitosamente.`, data: userDeGithub }
            }
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
