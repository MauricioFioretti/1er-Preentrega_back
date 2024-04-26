import { UserManager } from "../Dao/db/managers/usersManagerDB.js"

const user = new UserManager()

export const getUsers = async () => {
    try {
        return await user.getUsers()
    } catch (error) {
        throw new Error('Error al obtener usuarios')
    }
}