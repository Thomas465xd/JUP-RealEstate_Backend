import mongoose, { Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
    // Base user info
    name: string
    surname: string
    password: string
    email: string
    phone: string
    
    // User Status
    confirmed: boolean
    role: "buyer" | "seller" | "admin"
}

const userSchema : Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String, 
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },

    // User Status
    confirmed: {    
        type: Boolean, 
        default: false
    }, 
    role: {
        type: String,
        enum: ["buyer", "seller", "admin"],
        default: "buyer"
    }
}, {timestamps: true})

const User = mongoose.model<UserInterface>('User', userSchema)

export default User