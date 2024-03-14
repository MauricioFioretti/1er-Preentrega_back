import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local'
import { UserManager } from '../../Dao/db/models/usersManagerDB.js'

//Instanciamos UserManager()
const user = new UserManager()

export function initializePassport() {

    //Estrategia de Registro
    passport.use('register', new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                let newUser = req.body
                let respuestaAddUser = await user.addUser(newUser)

                if (!respuestaAddUser.success) {
                    return done(respuestaAddUser.message + respuestaAddUser.error)
                }

                return done(null, respuestaAddUser.result)
            } catch (error) {
                return done(error)
            }
        }
    ))

    //Estrategia de Login
    passport.use('login', new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {   
                let respuestaLogin = await user.getUserByEmail(username, password)

                if (!respuestaLogin.success) {
                    return done(respuestaLogin.message + respuestaLogin.error)
                }
                
                return done(null, respuestaLogin.data)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((usuario, done) => {
        done(null, usuario)
    })

    passport.deserializeUser( (usuario, done) => {
        done(null, usuario) 
    })
}


