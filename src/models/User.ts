import mongoose, { Schema, Document } from 'mongoose';

const userRegion = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana de Santiago",
    "O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén",
    "Magallanes"
] as const;

export interface UserInterface extends Document {
    // Base user info
    name: string
    businessName: string
    email: string
    phone: string
    password: string

    // User Status
    confirmed: boolean
    passwordSet: boolean
    admin: boolean
}

const userSchema : Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    businessName: {
        type: String, 
        required: true,
        trim: true
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
        required: true,
        trim: true
    },

    // User Status
    password: {
        type: String,
        required: false
    },
    confirmed: {    
        type: Boolean, 
        default: false
    }, 
    passwordSet: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})

const User = mongoose.model<UserInterface>('User', userSchema)

export default User