import mongoose from "mongoose"

export class MongoSingleton {
    static #instance

    constructor() {
        mongoose.connect(process.env.URLMONGO)

        mongoose.connection.on('error', err => {
            console.error('Error connecting to MongoDB:', err)
        })

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB')
        })
    }

    static getInstance() {
        if (this.#instance) {
            console.log('La conexión a la db ya existe')
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        return this.#instance
    }
}