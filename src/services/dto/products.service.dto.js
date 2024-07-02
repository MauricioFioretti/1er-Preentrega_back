export function productsServiceDTO(productos, limit, sort, query) {
    //Cambiamos el nombre docs (nombre asiganado por paginate) a payload
    productos.payload = productos.docs
    delete productos.docs

    //Creamos las propiedades de prevLink y nextLink
    productos.prevLink = productos.prevPage ? `https://ecommerce-venta-de-libros-oma-production.up.railway.app/products?page=${productos.prevPage}&limit=${limit}&query=${query ? `&query=${query}` : ''}&sort=${sort}` : null

    productos.nextLink = productos.nextPage ? `https://ecommerce-venta-de-libros-oma-production.up.railway.app/products?page=${productos.nextPage}&limit=${limit}&query=${query ? `&query=${query}` : ''}&sort=${sort}` : null

    //Acomodamos category para que se vea bien sin guiones
    productos.payload.forEach(la => { la.category = la.category.replace(/-/g, ' ') })

    return productos
}