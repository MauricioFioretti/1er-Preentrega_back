import passport from "passport"

export const codigo = (strategy, req, res, next, pagina) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
        if (info) {
            if (info.message === 'jwt expired') {
                res.redirect(pagina)
            } else {
                return res.redirect(pagina)
            }
        }
        if (!user) {
            return res.redirect(pagina)
        }
        req.user = user
        next()
    })(req, res, next)
}
