import { Router } from "express"

// Importar la clase ProductManager desde el módulo index.js
import { ProductManager } from "../../Dao/db/models/productManagerDB.js" 

//import { io } from "../app.mjs"
import { io } from "../app.mjs"

//Instanciamos Router() en la variable que vamos a usar routerProd
const routerRealTimeProducts = Router()

// Crear una instancia de Produ ctManager
const prod = new ProductManager()

routerRealTimeProducts.get('/', async (req, res) => {
    const products = await prod.getProducts().data
    res.render('realTimeProducts', {
        "array": products,
        "valor": true
    })

    //Prendo el servidor io y me pongo a escuchar con .on 
    io.on('connection', async (socket) => {

        // Emitir los productos iniciales al conectarse
        const products = await prod.getProducts().data
        console.log(products)
        socket.emit('productsListos', products)

        //Mensaje de conexion apenas cargamos el sitio.
        socket.on('mensajeConexion', (data) => {
            if (data) {
                console.log(data)
                socket.emit('mensaje', 'Hola cliente')
            }
        })

        //Recibo todos los productos del Front actualizados, los proceso y los guardo en un array, pero solo con la propiedades necesarias
        socket.on('dataProducts', (data) => {
            const arrayProductosListo = []
            for (let obj of data) {
                console.log(obj)
                arrayProductosListo.push({
                    "title": obj.title,
                    "description": obj.description,
                    "price": obj.price,
                    "category": obj.category
                })
            }

            //Mandamos el objeto con los productos listos para crear una funcion que genere html por cada producto y los haga cards
            io.sockets.emit('productsListos', arrayProductosListo)
        })
    })
})

export default routerRealTimeProducts