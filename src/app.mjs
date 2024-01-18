import express, { urlencoded } from 'express'
import routerProd from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'

// Crear una instancia de Express 
const app = express()
app.use(express.json())
app.use(urlencoded({ extended: true }))

//Routes
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:8080`)
})

//En caso que el archivo products.json no esté creado en la carpeta data, aplicar el comando 'npm run crear'.
//Para poner en marcha el servidor, escribir el comando 'npm start' o 'npm run start' o 'nodemon ./src/app.mjs'