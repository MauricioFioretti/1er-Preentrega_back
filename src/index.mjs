import { promises as fs } from 'node:fs'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'

// Obtener la ruta del archivo actual (__filename) y su directorio (__dirname)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export class ProductManager {
    constructor() {
        // Al utilizar el módulo path de Node.js junto con la variable global __dirname, creamos una ruta completa que es independiente del directorio en el que se encuentra el archivo 'products.json' y las unimos con join del módulo de Node.js.
        this.path = join(__dirname, '../data/products.json')
        this.archivoExiste()
    }

    //Método para verificar si el archivo existe. si no, lo crea con un array vacío.
    async archivoExiste() {
        try {
            // Verifica si el archivo existe.
            const existe = existsSync(this.path)
            if (!existe) {
                // Si el archivo no existe, lo crea con un array vacío.
                await fs.writeFile(this.path, '[]', 'utf-8')
                console.log(`Archivo creado exitosamente en la ruta ${this.path}`)
            }
        } catch (error) {
            // Captura y manejo de errores durante la creación del archivo.
            console.error(`Hubo un error al crear el archivo ${this.path}. El error fue ${error}`)
        }
    }

    // Método para leer el contenido de un archivo JSON.
    async leerArchivo(ruta) {
        try {
            // Lee y parsea el contenido del archivo JSON.
            return JSON.parse(await fs.readFile(ruta, 'utf-8'))
        } catch (error) {
            // Captura y manejo de errores durante la lectura del archivo.
            console.error(`Error al leer el archivo.`, error)
        }
    }

    // Método para escribir en un archivo JSON.
    async escribirArchivo(ruta, contenido) {
        try {
            // Escribe el contenido en el archivo JSON.
            await fs.writeFile(ruta, JSON.stringify(contenido), 'utf-8')
        } catch (error) {
            // Captura y manejo de errores durante la escritura en el archivo.
            console.error(`Error al escribir en el archivo.`, error)
        }

    }

    // Método para obtener todos los productos.
    async getProducts() {
        try {
            // Obtiene y muestra por consola todos los productos.
            let products = await this.leerArchivo(this.path)
            return { success: true, message: "Productos obtenidos correctamente", data: products }
        }
        catch (error) {
            // Captura y manejo de errores durante la obtención de productos.
            return { success: false, message: `Error al obtener los productos.`, error: error.message }
        }
    }

    // Método para agregar un nuevo producto.
    async addProducts(newProduct) {
        try {
            // Verifica si algún campo requerido está vacío.
            if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
                throw new Error('El producto que intenta agregar no tiene todos los campos')
            }
            // Obtiene productos existentes.
            let products = await this.leerArchivo(this.path)

            // Verifica si el código del producto ya existe.
            if (products.some((prod) => prod.code === newProduct.code)) {
                throw new Error(`El código ${newProduct.code} ya existe`)
            }

            // Verifica si el título del producto ya existe.
            if (products.some((prod) => prod.title === newProduct.title)) {
                throw new Error(`El título ${newProduct.title} ya existe`)
            }

            // Verifica si el imagen del producto ya existe.
            if (products.some((prod) => prod.thumbnail === newProduct.thumbnail)) {
                throw new Error(`La imágen del producto '${newProduct.thumbnail}' ya existe`)
            }

            // Genera un nuevo ID basado en el último producto existente.
            newProduct.id = products.length ? products[products.length - 1].id + 1 : 1

            // Agrega el nuevo producto y actualiza el archivo.
            products.push(newProduct)
            await this.escribirArchivo(this.path, products)

            // Devuelve un objeto que indica el éxito.
            return { success: true, message: `El producto ${newProduct.title} ha sido agregado correctamente`, data: newProduct }
        }
        catch (error) {
            // Captura y manejo de errores durante la adición de productos.
            return { success: false, message: `Error al agregar el producto`, error: error.message }
        }
    }

    // Método para obtener un producto por su ID.
    async getProductById(id) {
        try {
            // Obtiene productos y busca un producto por ID.
            let products = await this.leerArchivo(this.path)
            let busquedaPorId = products.find((prod) => prod.id === id)

            if (busquedaPorId) {
                return { success: true, message: `El producto con id ${id} se encontró exitosamente.`, data: busquedaPorId }
            } else {
                throw new Error(`El producto con id ${id} no ha sido encontrado.`)
            }
        }
        catch (error) {
            // Captura y manejo de errores durante la obtención de un producto por ID.
            return { success: false, message: `Error al obtener el producto por ID.`, error: error.message }
        }
    }

    // Método para actualizar los campos de un producto por su ID.
    async updateProduct(id, camposActualizados) {
        try {
            // Obtener la lista actual de productos.
            let products = await this.leerArchivo(this.path)

            //Uso findIndex para saber la posición del producto buscado, si devuelve -1 no existe
            let productoIndex = products.findIndex((prod) => prod.id === id)

            if (productoIndex !== -1) {
                delete camposActualizados.id
                delete camposActualizados.code

                let reducidos = products.filter((prod) => prod.id !== id)

                // Verifica si el título del producto ya existe.
                if (reducidos.some((prod) => prod.title === camposActualizados.title)) {
                    throw new Error(`El título ${camposActualizados.title} ya existe y no puede haber 2 libros con el mismo nombre.`)
                }

                // Verifica si el imagen del producto ya existe.
                if (reducidos.some((prod) => prod.thumbnail === camposActualizados.thumbnail)) {
                    throw new Error(`La imágen del producto '${camposActualizados.thumbnail}' ya existe y no puede haber 2 libros con la misma imágen.`)
                }

                // Copiar el producto encontrado para realizar modificaciones.
                let productoAModificar = { ...products[productoIndex] }

                // Actualizar los campos del producto con los proporcionados.
                Object.assign(productoAModificar, camposActualizados)

                // Reemplazar el producto original con el modificado en la lista de products.
                products[productoIndex] = productoAModificar

                // Escribir la lista actualizada de products en el archivo.
                await this.escribirArchivo(this.path, products)

                return { success: true, message: `El producto con id ${id} ha sido actualizado.`, data: productoAModificar }
            } else {
                throw new Error(`El producto con id: ${id} no ha sido encontrado`)
            }
        }
        catch (error) {
            // Captura y manejo de errores durante la actualización del producto.
            return { success: false, message: "Error al actualizar el producto.", error: error.message }
        }
    }

    // Método para eliminar un producto por su ID.
    async deleteProduct(id) {
        try {
            // Obtener la lista actual de productos.
            let productos = await this.leerArchivo(this.path)

            // Buscar el producto a eliminar y guardar la respuesta del método
            const respuesta = await this.getProductById(id)

            if (respuesta.success) {
                // Filtrar los productos para excluir el que tiene el ID proporcionado.
                let productosReducido = productos.filter((prod) => prod.id !== id)

                // Escribir la lista actualizada de productos en el archivo.
                await this.escribirArchivo(this.path, productosReducido)
                return { success: true, message: `El producto con id ${id} ha sido eliminado correctamente de la base de datos.`, data: productosReducido }
            } else {
                throw new Error(`El producto con id ${id} no se eliminó ya que no se encuentra en la base de datos.`)
            }
        }
        catch (error) {
            // Captura y manejo de errores durante la eliminación del producto.
            return { success: false, message: `Error al eliminar el producto.`, error: error.message }
        }
    }
}

// Exportación de la clase ProductManager y la función ejecutar para su uso en otros módulos.
export default { ProductManager }
