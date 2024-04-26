import './config/variablesEntorno.js'
import express, { urlencoded } from 'express'
import { engine } from 'express-handlebars'
import __dirname from './config/path.js'
import { join } from 'node:path'
import { MongoSingleton } from './Dao/db/mongoSingleton.js'
import passport from 'passport'
import { initializePassport } from './passport/passport.js'
import cookieParser from 'cookie-parser'
import { server, app } from "./utils/socket.js"

import routerProd from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import routerChat from './routes/chat.routes.js'
import routerViews from './routes/views.routes.js'
import routerAuth from './routes/auth.routes.js'
import routerSession from './routes/session.routes.js'

// Configurar Express 
app.use(express.json())
app.use(urlencoded({ extended: true }))

//Configurar cookies
app.use(cookieParser())

// Configurar passport
initializePassport()
app.use(passport.initialize())

//Configurar Handlebars o motor de plantilla
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', join(__dirname, '../views'))

//Configurar archivos estaticos de la carpeta public
app.use('/', express.static(join(__dirname, '../public')))

//Routes o endpoints
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.use('/api/chat', routerChat)
app.use('/api/session', routerSession)

app.use('/', routerViews)
app.use('/auth', routerAuth)

app.get('*', (req, res) => {
    res.status(404).send('La ruta no existe')
})

// Iniciar el servidor en el puerto 8080
server.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto http://${process.env.HOST}:${process.env.PORT}`)
    MongoSingleton.getInstance()
})
