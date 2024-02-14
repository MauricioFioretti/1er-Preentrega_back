import express, { urlencoded } from 'express'
import { engine } from 'express-handlebars'
import __dirname from '../config/path.js'
import { join } from 'node:path'
import { Server } from 'socket.io'
import http from 'http'
import { conectarConMongoDB } from "../Dao/db/index.js"

import routerProd from './routes/products.routes.js'
//import routerCart from './routes/carts.routes.js'
//import routerHandlebars from './routes/handlebars.routes.js'
//import routerRealTimeProducts from './routes/realTimeProds.routes.js'
import routerCart from './routes/carts2.routes.js'



// Importar la clase ProductManager desde el módulo index.js
//import { ProductManager } from './models/productManager.mjs'
// Crear una instancia de Produ ctManager
//const prod = new ProductManager()

// Crear una instancia de Express 
const app = express()
app.use(express.json())
app.use(urlencoded({ extended: true }))

// //Handlebars o motor de plantilla
// app.engine('handlebars', engine())
// app.set('view engine', 'handlebars')
// app.set('views', join(__dirname, '../src/views'))

//Archivos estaticos
app.use('/', express.static(join(__dirname, '../src/public')))

const server = http.createServer(app)

// Iniciar el servidor en el puerto 8080
server.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:8080`)
    conectarConMongoDB()
})

//Crear un servidor a traves de socket, con nuestro servidor anterior
const io = new Server(server)
export { app, io, server }





// //get de realtimeproducts y servidor io que escuchaq constantemente
// app.get('/realtimeproducts', async (req, res) => {
//     const products = await (await prod.getProducts()).data
//     res.render('realTimeProducts', {
//         "array": products,
//         "valor": true
//     })
// })

// //Prendo el servidor io y me pongo a escuchar con .on 
// io.on('connection', async (socket) => {

//     // Emitir los productos iniciales al conectarse
//     const products = await (await prod.getProducts()).data
//     socket.emit('productsListos', products)

//     //Mensaje de conexion apenas cargamos el sitio.
//     socket.on('mensajeConexion', (data) => {
//         if (data) {
//             console.log(data)
//             socket.emit('mensaje', 'Hola cliente')
//         }
//     })

//     //Recibo todos los productos del Front actualizados, los proceso y los guardo en un array, pero solo con la propiedades necesarias
//     socket.on('dataProducts', (data) => {
//         const arrayProductosListo = []
//         for (let obj of data) {
//             arrayProductosListo.push({
//                 "title": obj.title,
//                 "description": obj.description,
//                 "price": obj.price,
//                 "category": obj.category
//             })
//         }

//         //Mandamos el objeto con los productos listos para crear una funcion que genere html por cada producto y los haga cards
//         io.sockets.emit('productsListos', arrayProductosListo)
//     })
// })

//Routes o endpoints
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
//app.use('/handlebars', routerHandlebars)
//app.use('/realtimeproducts', routerRealTimeProducts)


//En caso que el archivo products.json no esté creado en la carpeta data, aplicar el comando 'npm run crear'.
//Para poner en marcha el servidor, escribir el comando 'npm start' o 'npm run start' o 'nodemon ./src/app.mjs'