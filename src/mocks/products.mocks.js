import {faker} from "@faker-js/faker/locale/es"

export const generateProduct = () =>{

    const categorias = ["OMA Nivel 1", "OMA Nivel 2", "OMA Nivel 3", "OMA Nivel 4", "OMA Nivel 5", "OMA Nivel 6"]

    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 1000, max: 10000, dec: 0 }),
        category: faker.helpers.arrayElement(categorias),
        code: faker.string.alphanumeric(8),
        stock: faker.number.int({min:0, max:20}),
        status: faker.datatype.boolean()
    }
}