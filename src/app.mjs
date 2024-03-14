import express, { urlencoded } from 'express'
import { engine } from 'express-handlebars'
import __dirname from '../config/path.js'
import { join } from 'node:path'
import { conectarConMongoDB } from "../Dao/db/index.js"
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { initializePassport } from './passport/passport.js'

import routerProd from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import routerProducts from './routes/handlebars.routes.js'
import { routerRealTimeProducts, server, app } from './routes/realTimeProds.routes.js'
import { routerChat } from './routes/chat.routes.js' 
import routerViews from './routes/views.routes.js'
import routerAuth from './routes/auth.routes.js'

//Iniciar session
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://mauriciofioretti:mauri1234@proyectocoderback.ooz4yfn.mongodb.net/eccomerce'
    }), 
    secret: 'coderSecret',
    resave: true,
    saveUninitialized: true
}))

// Configurar Express 
app.use(express.json())
app.use(urlencoded({ extended: true }))

// Configurar passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Configurar Handlebars o motor de plantilla
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', join(__dirname, '../src/views'))

//Configurar archivos estaticos de la carpeta public
app.use('/', express.static(join(__dirname, '../src/public')))

//Routes o endpoints
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.use('/products', routerProducts)
app.use('/realtimeproducts', routerRealTimeProducts)
app.use('/api/chat', routerChat)
app.use('/api/view', routerViews)
app.use('/api/auth', routerAuth)

// Iniciar el servidor en el puerto 8080
server.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:8080`)
    conectarConMongoDB()
})
