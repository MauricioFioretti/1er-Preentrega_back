import express from 'express'
import routerProd from './routes/products.routes.js'

// Crear una instancia de Express 
const app = express()
app.use(express.json())

//Routes
app.use('/api/products', routerProd)

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:8080`)
})

//En caso que el archivo products.json no esté creado en la carpeta data, aplicar el comando 'npm run crear' 2 veces.
//Para poner en marcha el servidor, escribir el comando 'npm start' o 'npm run start' o 'nodemon ./src/app.mjs'