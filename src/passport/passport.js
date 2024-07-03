import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as github } from 'passport-github2'
import { UserManager } from '../Dao/db/managers/usersManagerDB.js'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt as ExtracJwt } from "passport-jwt"

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

                return done(null, respuestaAddUser.message)
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

    //Estrategia de Restablecer contraseña
    passport.use('resetContra', new JwtStrategy({
        jwtFromRequest: ExtracJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SECRETJWT
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done("Error  en JWT  passport", error)
        }
    }))

    //Estrategia de Jwt
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtracJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SECRETJWT
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done("Error  en JWT  passport", error)
        }
    }))

    //Estrategia de User usando Jwt
    passport.use('user', new JwtStrategy({
        jwtFromRequest: ExtracJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SECRETJWT
    }, async (jwt_payload, done) => {
        try {
            if (jwt_payload.role !== 'User' && jwt_payload.role !== 'Premium'){
                throw new Error('Usted no esta autorizado ya que no tiene una sesión activa como usuario.')
            }
            return done(null, jwt_payload)
        } catch (error) {
            return done("Error en autenticar usuario usando JWT", error)
        }
    }))

    //Estrategia de Admin usando Jwt
    passport.use('admin', new JwtStrategy({
        jwtFromRequest: ExtracJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SECRETJWT
    }, async (jwt_payload, done) => {
        try {
            if (jwt_payload.role != 'Admin'){
                throw new Error('Usted no esta autorizado ya que no tiene una sesión activa como Administrador.')
            }
            return done(null, jwt_payload)
        } catch (error) {
            return done("Error en autenticar administrador usando JWT", error)
        }
    }))

    //Estrategia de Admin usando Jwt
    passport.use('admin-premium', new JwtStrategy({
        jwtFromRequest: ExtracJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SECRETJWT
    }, async (jwt_payload, done) => {
        try {
            if (jwt_payload.role != 'Admin' && jwt_payload.role != 'Premium'){
                throw new Error('Usted no esta autorizado ya que no tiene una sesión activa como Administrador o Premium.')
            }
            return done(null, jwt_payload)
        } catch (error) {
            return done("Error en autenticar administrador o premium usando JWT", error)
        }
    }))

    //Estrategia de registro-login github
    passport.use('github', new github.Strategy(
        {
            clientID: 'Iv1.bf8a429adc9c6c90',
            clientSecret: 'c067c1ead258f50fea2e3f4c55be5f294c013bca',
            callbackURL: `${process.env.HOST}/auth/callbackGithub`
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log('Entramos en esta parte')
                let usuario = await user.getUserByGithub(profile._json)

                if (!usuario.success) { return done(usuario.message + usuario.error) }

                return done(null, usuario.data)
                
            } catch (error) {
                return done(error)
            }
        }
    ))
}

export function cookieExtractor(req) {
    let token = null
    if (req && req.cookies) {
        token = req.cookies[process.env.SECRETCOOKIE]
    }
    return token
}
