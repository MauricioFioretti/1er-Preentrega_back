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

    // Método para obtener un usuario de github.
    async getUserByGithub(profile) {
        try {
            let email = profile.email
            let userDeGithub;

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
