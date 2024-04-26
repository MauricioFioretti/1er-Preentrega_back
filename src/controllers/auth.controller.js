import { generaToken } from "../utils/tokenJWT.js"

export const registerUser = async (req, res) => {
    res.redirect('/login')
}

export const failedRegister = (req, res) => {
    res.send('Failed register')
}

export const loginUser = async (req, res) => {
    let token = generaToken(req.user)
    res.cookie(process.env.SECRETCOOKIE, token, { httpOnly: true })
    res.redirect('/api/products')
}

export const failedLogin = (req, res) => {
    res.send('Failed login')
}

export const logoutUser = (req, res) => {
    res.clearCookie(process.env.SECRETCOOKIE).redirect('/login')
}

export const callbackGithub = (req, res) => {
    let token = generaToken(req.user)
    res.cookie(process.env.SECRETCOOKIE, token, { httpOnly: true })
    res.redirect('/api/products')
}