import { User } from "../models/users.modelDB.js"
import { createHash, isValidatePassword } from '../../../config/bcrypt.js'
import { v4 as uuidv4 } from 'uuid'
import { CartsManager } from "./cartManagerDB.js"

const carts = new CartsManager()


export class UserManager {
    // Método para agregar un nuevo usuario a la bd.
    async addUser(newUser) {
        try {
            newUser.password = createHash(newUser.password)
            newUser.cartId = uuidv4()
            await carts.addCart(newUser.cartId)
            let result = await User.create(newUser)
            return { success: true, message: `El usuario ${newUser.user} ha sido agregado correctamente`, data: newUser, result: result }
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

        if (email == 'adminCoder@coder.com' && password == 'adminCod3r123') {
            let userAdmin = {
                "firstName": 'Admin',
                "email": email,
                "role": "Admin"
            }
            return { success: true, message: `El usuario con email: ${email} se encontró exitosamente.`, data: userAdmin }

        } else {
            try {
                let busquedaPorEmail = await User.findOne({ email })
                let usuario = {
                    "firstName": busquedaPorEmail.firstName,
                    "email": busquedaPorEmail.email,
                    "cartId": busquedaPorEmail.cartId
                }

                if (busquedaPorEmail && isValidatePassword(password, busquedaPorEmail.password)) {
                    return { success: true, message: `El usuario con email: ${email} se encontró exitosamente.`, data: usuario }
                } else if (busquedaPorEmail && password == busquedaPorEmail.password) {
                    return { success: true, message: `El usuario con email: ${email} se encontró exitosamente.`, data: usuario }
                } else {
                    throw new Error(`El usuario o contraseña son incorrectos.`)
                }

            } catch (error) {
                // Captura y manejo de errores durante la obtención de un usuario por email y contra.
                return { success: false, message: `Error al obtener el usuario. `, error: error }
            }
        }
    }

    // Método para obtener un producto por su ID.
    async getUserByGithub(profile) {
        try {
            let email = profile.email
            let firstName = profile.name

            if (!email) {
                email = profile.id + '@gmail.com'
            } if (!firstName) {
                firstName = profile.login
            }

            let userDeGithub = await User.findOne({ email })

            if (userDeGithub) {
                let usuarioGithub = {
                    "firstName": userDeGithub.firstName,
                    "email": userDeGithub.email,
                    "cartId": userDeGithub.cartId
                }
                return { success: true, message: `El usuario con email: ${email} se encontró exitosamente.`, data: usuarioGithub }
            } else {
                userDeGithub = await User.create({
                    firstName,
                    email,
                    password: createHash('passwordGithub123.'),
                    cartId: uuidv4()
                })
                
                await carts.addCart(userDeGithub.cartId)

                let usuarioGithub = {
                    "firstName": userDeGithub.firstName,
                    "email": userDeGithub.email,
                    "cartId": userDeGithub.cartId
                }

                return { success: true, message: `El usuario con email: ${email} se encontró exitosamente.`, data: usuarioGithub }
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
