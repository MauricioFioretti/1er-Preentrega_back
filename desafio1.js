class ProductManager {
    constructor(){
        this.products = []
    }

    getProducts(){
        console.log(this.products)
    }

    addProducts(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log(`Todos los datos son obligatorios!`)
        }
        
        else{
            if(!this.products.some((product) => product.code === code)){
                let id = this.products.length + 1
                let newProduct = {title, description, price, thumbnail, code, stock, id }
                this.products.push(newProduct)
                console.log(`El libro ${title} ha sido agregado correctamente`)
            }
            else{
                console.log(`El codigo ${code} ya existe`)
            }
        }
    }

    getProductById(id){
        let prod = this.products.find( (p) => p.id === id)

        if(prod){
            console.log(prod)
        }
        else{
            console.log(`Not found`)
        }
    }

}

const productos = new ProductManager()

//Preguntar por todos los productos agregados
console.log(`\nPrueba de todos los productos agregados`)
productos.getProducts()

//Agregar productos a la class
console.log(`\nAgregando los libros`)
productos.addProducts('OMA 1', 'Problemas de olimpiadas nivel 1', '$4000', 'OMA1.jpg', 1234, 3)
productos.addProducts('OMA 2', 'Problemas de olimpiadas nivel 2', '$4000', 'OMA2.jpg', 1235, 3)
productos.addProducts('OMA 3', 'Problemas de olimpiadas nivel 3', '$4000', 'OMA3.jpg', 1236, 3)

//Validar todos los campos son oblicatorios
console.log(`\nPrueba de todos los campos son obligatorios`)
productos.addProducts('OMA 3', 'Problemas de olimpiadas nivel 3', 'OMA3.jpg', 1236, 3)

//Preguntar por todos los productos agregados
console.log(`\nPrueba de todos los productos agregados`)
productos.getProducts()

//Preguntar por un producto segun su id
console.log(`\nPrueba de buscar un producto segun su id`)
productos.getProductById(2)
productos.getProductById(4)