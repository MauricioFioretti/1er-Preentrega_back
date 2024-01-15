import { ProductManager } from './index.mjs'

// Función autoinvocada asincrónica para ejecutar pruebas y operaciones con la clase ProductManager.
(async function ejecutar() {
    // Instancia de la clase ProductManager para gestionar productos.
    const productos = new ProductManager()

    //Preguntar por todos los productos agregados
    console.log(`\nLos productos ya agregados son:`)
    await productos.getProducts()

    //Agregar productos a la class
    console.log(`\nAgregando los libros:`)

    await productos.addProducts({title:'OMA 1', description:'Problemas de olimpiadas nivel 1', price:'$4000', thumbnail: 'OMA1.jpg',code: 1234,stock: 10})
    await productos.addProducts({title:'OMA 2', description:'Problemas de olimpiadas nivel 2', price:'$4000', thumbnail: 'OMA2.jpg',code: 1235,stock: 10})
    await productos.addProducts({title:'OMA 3', description:'Problemas de olimpiadas nivel 3', price:'$4000', thumbnail: 'OMA3.jpg',code: 1236,stock: 10})
    await productos.addProducts({title:'OMA 4', description:'Problemas de olimpiadas nivel 4', price:'$4000', thumbnail: 'OMA4.jpg',code: 1237,stock: 10})
    await productos.addProducts({title:'OMA 5', description:'Problemas de olimpiadas nivel 5', price:'$4000', thumbnail: 'OMA5.jpg',code: 1238,stock: 10})
    await productos.addProducts({title:'OMA 6', description:'Problemas de olimpiadas nivel 6', price:'$4000', thumbnail: 'OMA6.jpg',code: 1239,stock: 10})


    //Validar todos los campos son oblicatorios
    console.log(`\nPrueba de todos los campos son obligatorios`)
    await productos.addProducts({title:'OMA 3', description:'Problemas de olimpiadas nivel 3', thumbnail: 'OMA3.jpg', code: 1236, stock: 10})

    //Validar si el código ya existe
    console.log(`\nPrueba de código identificador repetido`)
    await productos.addProducts({title:'OMA 7', description:'Problemas de olimpiadas nivel 7', price:'$4000', thumbnail: 'OMA7.jpg',code: 1237,stock: 10})

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

    //Preguntar por un producto según su id
    console.log(`\nPrueba de buscar un producto según su id`)
    await productos.getProductById(2)
    await productos.getProductById(4)

    //Eliminar un producto según su id
    console.log(`\nEliminar un producto según su id`)
    await productos.deleteProduct(1)
    await productos.deleteProduct(2)

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

    //Modificar los campos de un producto
    console.log(`\nPrueba de modificación de un producto`)
    await productos.updateProduct(6, { price: "$50000", stock: 150 })

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()
})()