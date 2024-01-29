import express, { urlencoded } from 'express'
import { engine } from 'express-handlebars'
import __dirname from '../config/path.js'
import { join } from 'node:path'
import { Server } from 'socket.io'
import http from 'http'

import routerProd from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import routerHandlebars from './routes/handlebars.routes.js'
import routerRealTimeProducts from './routes/realTimeProds.routes.js'

// Crear una instancia de Express 
const app = express()
app.use(express.json())
app.use(urlencoded({ extended: true }))

//Handlebars o motor de plantilla
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', join(__dirname , '../src/views'))

//Archivos estaticos
app.use('/', express.static(join(__dirname, '../src/public')))

const server = http.createServer(app)

// Iniciar el servidor en el puerto 8080
server.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:8080`)
})

//Crear un servidor a traves de socket, con nuestro servidor anterior
const io = new Server(server)
export { app, io, server }

//Routes o endpoints
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.use('/handlebars', routerHandlebars)    
app.use('/realtimeproducts', routerRealTimeProducts)


//En caso que el archivo products.json no esté creado en la carpeta data, aplicar el comando 'npm run crear'.
//Para poner en marcha el servidor, escribir el comando 'npm start' o 'npm run start' o 'nodemon ./src/app.mjs'