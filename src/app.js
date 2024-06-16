import './config/variablesEntorno.js'
import express, { urlencoded } from 'express'
import expressHandlebars from 'express-handlebars'
import __dirname from './config/path.js'
import { join } from 'node:path'
import { MongoSingleton } from './Dao/db/mongoSingleton.js'
import passport from 'passport'
import { initializePassport } from './passport/passport.js'
import cookieParser from 'cookie-parser'
import { server, app } from "./utils/socket.js"
import compression from 'compression'
import errorHandler from './middleware/errors/index.js'
import { addLogger } from "./config/logger.js"

import routerProd from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import routerChat from './routes/chat.routes.js'
import routerViews from './routes/views.routes.js'
import routerAuth from './routes/auth.routes.js'
import routerSession from './routes/session.routes.js'
import routerMocking from './routes/mockingproducts.routes.js'
import routerLogger from './routes/logger.routes.js'
import routerRecuperar from './routes/recuperacion.routes.js'
import routerUser from './routes/users.routes.js'

// Configurar compression 
app.use(compression())

// Configurar Express 
app.use(express.json())
app.use(urlencoded({ extended: true }))

//Configurar cookies
app.use(cookieParser())

// Configurar passport
initializePassport()
app.use(passport.initialize())

//Configurar Handlebars o motor de plantilla
const hbs = expressHandlebars.create({
    runtimeOptions: { // Opciones adicionales
        allowProtoMethodsByDefault: true, // Permite el acceso a métodos del prototipo
        allowProtoPropertiesByDefault: true // Permite el acceso a propiedades del prototipo
    }
})

// Definir el helper "eq"
hbs.handlebars.registerHelper('eq', function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', join(__dirname, '../views'))

//Configurar archivos estaticos de la carpeta public
app.use('/', express.static(join(__dirname, '../public')))

//Configurar middleware logger
app.use(addLogger)

//Routes o endpoints
app.use('/api/users', routerUser)
app.use('/api/carts', routerCart)
app.use('/api/chat', routerChat)
app.use('/api/session', routerSession)
app.use('/api/recuperacion-contra', routerRecuperar)

app.use('/', routerViews)
app.use('/products', routerProd)

app.use('/auth', routerAuth)
app.use('/mockingproducts', routerMocking)
app.use('/loggerTest', routerLogger)

app.use(errorHandler)

app.get('*', (req, res) => {
    res.status(404).send('La ruta no existe')
})

// Iniciar el servidor en el puerto 8080
server.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto http://${process.env.HOST}:${process.env.PORT}`)
    MongoSingleton.getInstance()
})
