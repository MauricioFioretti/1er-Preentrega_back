import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
        required: true
    }
})

export const User = mongoose.model('users', UserSchema)