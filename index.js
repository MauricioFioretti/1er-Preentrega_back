const fs = require('fs').promises
const fs2 = require('fs')

//Funcion para saber si existe un archivo creado en determianda ruta
// async function archivoExiste(ruta) {
//     try {
//         await fs.access(ruta)
//         return true
//     } catch (error) {
//         return false
//     }
// }

class ProductManager {
    constructor() {
        this.path = './products.json'
        this.archivoExiste2()
    }

    async archivoExiste2(){
        let existe = fs2.existsSync(this.path)
        if(!existe){
            await fs.writeFile(this.path, '[]')
        }
    }

    // async getProducts() {
    //     try {
    //         let existe = await archivoExiste(this.path)
    //         if (!existe) {
    //             console.log(`El archivo no existe`)
    //         } 
    //         else {
    //             try {
    //                 let contenidoArchivo = await fs.readFile(this.path, 'utf-8')
    //                 let contenidoArchivoParseado = JSON.parse(contenidoArchivo)
    //                 console.log(contenidoArchivoParseado)
    //                 return contenidoArchivoParseado
    //             } 
    //             catch (error) {
    //                 console.log(`El contenido del archivo no es un JSON válido.`, error)
    //                 await fs.writeFile(this.path, '[]')
    //             }
    //         }
    //     } 
    //     catch (error) {
    //         console.log(`Error al abrir archivo:`, error)
    //         await fs.writeFile(this.path, '[]')
    //         console.log(`El archivo no existía o no contenía un JSON válido, pero fue creado exitosamente en la ruta '${this.path}'`)
    //     }
    // }

    // async addProducts(title, description, price, thumbnail, code, stock) {
    //     try {
    //         if (!title || !description || !price || !thumbnail || !code || !stock) {
    //             console.log(`Todos los datos son obligatorios!`)
    //         } 
    //         else {
    //             let existe = await archivoExiste(this.path)
    //             let products = existe ? JSON.parse(await fs.readFile(this.path, 'utf-8')) : []

    //             if (!products.some((product) => product.code === code)) {

    //                 //La variable id comienza valiendo 1, y si existen productos, entonces toma el ultimo producto para saber el ultimo id e incrementarlo. Ya que ahora eliminamos productos y no sirve el length para tomar el tamaño de la lista de objetos.
    //                 let id = 1
    //                 if(products[0]){
    //                     id = products[products.length-1].id + 1 
    //                 }            

    //                 let newProduct = { title, description, price, thumbnail, code, stock, id }
    //                 products.push(newProduct)
    //                 await fs.writeFile(this.path, JSON.stringify(products))
    //                 console.log(`El libro ${title} ha sido agregado correctamente`)
    //             } else {
    //                 console.log(`El código ${code} ya existe`)
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // async getProductById(id) {
    //     try {
    //         let productos = await fs.readFile(this.path, 'utf-8')
    //         productos = JSON.parse(productos)

    //         let busquedaPorId = productos.find((prod) => prod.id === id)
            
    //         if(busquedaPorId){
    //             console.log(busquedaPorId)
    //         }
    //         else{
    //             console.log(`El producto con el id: ${id} no se ha encontrado.`)
    //         }            
    //     } 
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    // async updateProduct(id, camposActualizados ) {
    //     try {
    //         let productos = await fs.readFile(this.path, 'utf-8')
    //         productos = JSON.parse(productos)

    //         //Uso findIndex para saber la posición del producto buscado, si devuelve -1 no existe
    //         let productoIndex = productos.findIndex((prod) => prod.id === id)

    //         if(productoIndex != -1){
    //             let productoModificado = {...productos[productoIndex]}
    //             Object.assign(productoModificado, camposActualizados)
    //             productos[productoIndex] = productoModificado
    //             await fs.writeFile(this.path, JSON.stringify(productos))
    //         }       
    //         else{
    //             console.log(`El producto con id: ${id} no ha sido encontrado`)
    //         }
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    // async deleteProduct(id) {
    //     try {
    //         let productos = await fs.readFile(this.path, 'utf-8')
    //         productos = JSON.parse(productos)
    //         let productosReducido = productos.filter((prod) => prod.id !== id)
    //         await fs.writeFile(this.path, JSON.stringify(productosReducido))       
    //     }

    //     catch (error) {
    //         console.log(error)
    //     }
    // }
}

async function ejecutar() {
    const productos = new ProductManager()

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

    //Agregar productos a la class
    console.log(`\nAgregando los libros`)
    await productos.addProducts('OMA 1', 'Problemas de olimpiadas nivel 1', '$4000', 'OMA1.jpg', 1234, 3)
    await productos.addProducts('OMA 2', 'Problemas de olimpiadas nivel 2', '$4000', 'OMA2.jpg', 1235, 3)
    await productos.addProducts('OMA 3', 'Problemas de olimpiadas nivel 3', '$4000', 'OMA3.jpg', 1236, 3)

    //Validar todos los campos son oblicatorios
    console.log(`\nPrueba de todos los campos son obligatorios`)
    await productos.addProducts('OMA 3', 'Problemas de olimpiadas nivel 3', 'OMA3.jpg', 1236, 3)

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

    //Preguntar por un producto según su id
    console.log(`\nPrueba de buscar un producto según su id`)
    await productos.getProductById(2)
    await productos.getProductById(4)

    //Preguntar por un producto según su id
    console.log(`\nEliminar un producto según su id`)
    await productos.deleteProduct(1)
    await productos.deleteProduct(2)

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

    //Modificar los campos de un producto
    console.log(`\nPrueba de modificación de un producto`)
    await productos.updateProduct(5, { "price": "$50000", "stock": 150 } )

    //Preguntar por todos los productos agregados
    console.log(`\nPrueba de todos los productos agregados`)
    await productos.getProducts()

}

// ejecutar()

//Luego de la primer ejecución se espera en el archivo creado products.json:
//[{"title":"OMA 3","description":"Problemas de olimpiadas nivel 3","price":"$4000","thumbnail":"OMA3.jpg","code":1236,"stock":3,"id":3}] 

//Luego de la segunda ejecución se espera en el archivo creado products.json:
//[{"title":"OMA 3","description":"Problemas de olimpiadas nivel 3","price":"$4000","thumbnail":"OMA3.jpg","code":1236,"stock":3,"id":3},{"title":"OMA 1","description":"Problemas de olimpiadas nivel 1","price":"$4000","thumbnail":"OMA1.jpg","code":1234,"stock":3,"id":4},{"title":"OMA 2","description":"Problemas de olimpiadas nivel 2","price":"$50000","thumbnail":"OMA2.jpg","code":1235,"stock":150,"id":5}]


module.exports = ProductManager