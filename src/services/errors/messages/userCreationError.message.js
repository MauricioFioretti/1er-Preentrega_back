export function generateUserErrorInfo(firstName, email) { 
    return `
    Una o mas propiedades fueron enviadas incompletas o no son validas.
    Lista de propiedades requeridas:
        -> firstName: type String, recibido: ${firstName}
        -> email: type String, recibido: ${email}
    `
}

export function generateUserEmailErrorInfo(email) { 
    return `
    El email ya existe en la base de datos
        -> email: type String, recibido: ${email}
    `
}

export function generateProductByIdInfo(id) { 
    return `
    El id ingresado es incorrecto y no se encuentra en la base de datos
        -> ID: type String, recibido: ${id}
    `
}

export function generateUpdateProductInfo(id, camposActualizados) { 
    return `
    El id ingresado es incorrecto y no se encuentra en la base de datos
        -> ID: type String, recibido: ${id}
    `
}


