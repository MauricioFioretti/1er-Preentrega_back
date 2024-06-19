import nodemailer from 'nodemailer'

//configuramos nodemailer
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'mauriciofioretti@gmail.com',
        pass: 'cijlrobybokbumqg'
    }
})