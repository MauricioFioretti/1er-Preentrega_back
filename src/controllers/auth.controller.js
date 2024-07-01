import { generaToken } from "../utils/tokenJWT.js"

export class AuthController {
    registerUser = async (req, res) => {
        res.redirect('/login')
    }

    loginUser = async (req, res) => {
        let token = generaToken(req.user)
        res.cookie(process.env.SECRETCOOKIE, token, { httpOnly: true })
        res.redirect('/products')
    }

    logoutUser = (req, res) => {
        res.clearCookie(process.env.SECRETCOOKIE).redirect('/login')
    }

    callbackGithub = (req, res) => {
        let token = generaToken(req.user)
        res.cookie(process.env.SECRETCOOKIE, token, { httpOnly: true })
        res.redirect('/products')
    }
}