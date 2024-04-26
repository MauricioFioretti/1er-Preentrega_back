import { getUsers } from "../services/views.service.js"

export const getUsersController = async (req, res) => {
    try {
        const usuarios = await getUsers()
        res.send(usuarios)
    } catch (error) {
        res.status(500).send('Error interno del servidor')
    }
}

export const renderRegister = async (req, res) => {
    res.render('register')
}

export const renderLogin = async (req, res) => {
    res.render('login')
}