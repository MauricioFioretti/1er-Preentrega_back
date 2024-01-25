import { Router } from "express"

// Importar la clase ProductManager desde el módulo index.js
import { ProductManager } from "../models/productManager.mjs"

import { io } from "../app.mjs"

//Instanciamos Router() en la variable que vamos a usar routerProd
const routerRealTimeProducts = Router()

// Crear una instancia de Produ ctManager
const prod = new ProductManager()

routerRealTimeProducts.get('/', async (req, res) => {
    const products = await (await prod.getProducts()).data
    res.render('realTimeProducts', {
        "array": products,
        "valor": true
    })

    //Prendo el servidor io y me pongo a escuchar con .on 
    io.on('connection', (socket) => {
        socket.on('mensajeConexion', (data) => {
            if (data) {
                console.log(data)
                socket.emit('mensaje', 'Hola cliente')
            }
        })

        //Recibo todos los productos del Front actualizados, los proceso y los guardo en un array, pero solo con la propiedades necesarias
        socket.on('dataProducts', (data)=>{
            const arrayProductosListo = []
            for(let obj of data){
                arrayProductosListo.push({
                    "title": obj.title,
                    "description": obj.description,
                    "price": obj.price,
                    "category": obj.category
                })
            }

            //Mandamos el objeto con los productos listos para crear una funcion que genere html por cada producto y los haga cards
            socket.emit('productsListos', arrayProductosListo)
        })
    })
})

export default routerRealTimeProducts