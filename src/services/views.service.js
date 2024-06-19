import { UserManager } from "../Dao/db/managers/usersManagerDB.js"

const user = new UserManager()

export class UsersService {
    async getUserById(id) {
        try {
            return await user.getUserById(id)
        } catch (error) {
            throw new Error('Error al obtener usuarios')
        }
    }

    async getUsers() {
        try {
            return await user.getUsers()
        } catch (error) {
            throw new Error('Error al obtener usuarios')
        }
    }

    async updateUser(uid) {
        try {
            return await user.updateUser(uid)
        } catch (error) {
            throw new Error('Error al obtener usuarios')
        }
    }

    async deleteUser(uid) {
        try {
            return await user.deleteUser(uid)
        } catch (error) {
            throw new Error('Error al obtener usuarios')
        }
    }
}