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
            return products
        }
        catch (error) {
            // Captura y manejo de errores durante la obtención de productos.
            return `Error al obtener los productos.`, error
        }
    }

    // Método para agregar un nuevo producto.
    async addProducts(newProduct) {
        try {
            // Verifica si algún campo requerido está vacío.
            if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
                return `El producto que intenta agregar no tiene todos los campos!`
            } else {
                // Obtiene productos existentes.
                let products = await this.leerArchivo(this.path)

                // Verifica si el código del producto ya existe.
                if (!products.some((prod) => prod.code === newProduct.code)) {

                    // Genera un nuevo ID basado en el último producto existente.
                    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1

                    // Agrega el nuevo producto y actualiza el archivo.
                    products.push(newProduct)
                    await this.escribirArchivo(this.path, products)
                    return `El libro ${newProduct.title} ha sido agregado correctamente`

                } else {
                    return `El código ${newProduct.code} ya existe`
                }
            }
        } catch (error) {
            // Captura y manejo de errores durante la adición de productos.
            return `Error al agregar un producto.`, error
        }
    }

    // Método para obtener un producto por su ID.
    async getProductById(id) {
        try {
            // Obtiene productos y busca un producto por ID.
            let products = await this.leerArchivo(this.path)
            let busquedaPorId = products.find((prod) => prod.id === id)

            if (busquedaPorId) {
                return busquedaPorId
            } else {
                return false
            }
        }
        catch (error) {
            // Captura y manejo de errores durante la obtención de un producto por ID.
            return {messaje: `Error al obtener el producto por ID.`, error: error}
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
                // Copiar el producto encontrado para realizar modificaciones.
                let productoAModificar = { ...products[productoIndex] }

                // Actualizar los campos del producto con los proporcionados.
                Object.assign(productoAModificar, camposActualizados)

                // Reemplazar el producto original con el modificado en la lista de products.
                products[productoIndex] = productoAModificar

                // Escribir la lista actualizada de products en el archivo.
                await this.escribirArchivo(this.path, products)

                return `El producto con id ${id} ha sido actualizado.`
            } else {
                return `El producto con id: ${id} no ha sido encontrado`
            }
        }
        catch (error) {
            // Captura y manejo de errores durante la actualización del producto.
            return `Error al actualizar el producto.`, error
        }
    }

    // Método para eliminar un producto por su ID.
    async deleteProduct(id) {
        try {
            // Obtener la lista actual de productos.
            let productos = await this.leerArchivo(this.path)

            // Buscar el producto a eliminar y guardar la respuesta del método
            const respuesta = await this.getProductById(id)

            if (respuesta) {
                // Filtrar los productos para excluir el que tiene el ID proporcionado.
                let productosReducido = productos.filter((prod) => prod.id !== id)

                // Escribir la lista actualizada de productos en el archivo.
                await this.escribirArchivo(this.path, productosReducido)
                return `El producto con id ${id} ha sido eliminado correctamente de la base de datos.`
            } else {
                return `El producto con id ${id} no se eliminó, ya que no se encuentra en la base de datos.`
            }
        }
        catch (error) {
            // Captura y manejo de errores durante la eliminación del producto.
            return `Error al eliminar el producto.`, error
        }
    }
}

// Exportación de la clase ProductManager y la función ejecutar para su uso en otros módulos.
export default { ProductManager }
