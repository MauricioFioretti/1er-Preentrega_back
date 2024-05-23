import winston from "winston"

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'magenta',
        debug: 'green'
    }
}

winston.addColors(customLevelOptions.colors)

// config Logger de developer
const devLogger = winston.createLogger({
    //declaramos los niveles
    levels: customLevelOptions.levels,

    //declaramos el transporte
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        })
    ]
})

// config Logger de production
const prodLogger = winston.createLogger({
    //declaramos los niveles
    levels: customLevelOptions.levels,

    //declaramos el transporte
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: "error",
            format: winston.format.simple()
        })  
    ]
})

//creamos el middleware
export const addLogger = (req, res, next) => {
    if (process.env.MODE === "dev") {
        req.logger = devLogger
    } else {
        req.logger = prodLogger
    }
    next()
} 