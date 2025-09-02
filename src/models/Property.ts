import mongoose, { Schema, Document } from 'mongoose';

const regions = [
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

export interface PropertyInterface extends Document {
    // Base property info (required)
    title: string
    description: string
    //type: "house" | "apartment" | "land" | "commercial" | "office"
    type: "casa" | "departamento" | "parcela" | "sitio" | "oficina" | "comercial"
    operation: "En Arriendo" | "En Venta"
    price: number // Price will be displayed in Chilean UF
    address: string
    //status: "available" | "sold" | "pending"
    status: "disponible" | "vendida" | "pendiente"
    dorms: number
    bathrooms: number
    parkingSpaces: number
    area: number
    region: string
    cityArea: string
    condo: boolean

    // Image attributes
    imagesUrls: string[]
}

const propertySchema : Schema = new Schema({
    // Base property info (required)
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true,
        trim: true
    },
    type: { 
        type: String, 
        //enum: ["house", "apartment", "land", "commercial", "office"], 
        enum: ["casa", "departamento", "parcela", "sitio", "oficina", "comercial"],
        required: true 
    },
    operation: {
        type: String, 
        enum: ["En Arriendo", "En Venta"], 
        required: true
    },
    price: { 
        type: Number, 
        default: 0,
        required: true,
        trim: true,
    },
    address: { 
        type: String, 
        required: true,
        trim: true
    },
    status: { 
        type: String, 
        //enum: ["available", "sold", "pending"], 
        enum: ["disponible", "vendida", "pendiente"], 
        default: "disponible" 
    },
    dorms: { 
        type: Number, 
        required: true,
        trim: true
    },
    bathrooms: { 
        type: Number, 
        required: true,
        trim: true
    },
    parkingSpaces: { 
        type: Number, 
        default: 0,
        trim: true
    },
    area: { 
        type: Number, 
        required: true,
        trim: true
    }, // in square meters
    region: { 
        type: String, 
        enum: regions, 
        required: true
    },
    cityArea: { 
        type: String, 
        required: true,
        trim: true
    },
    condo: { 
        type: Boolean, 
        default: false,
        trim: true
    }, 

    // Image Attributes
    imageUrls: {
        type: [String], // array of strings
        required: true,
        trim: true,
        validate: {
            validator: function(arr: string[]) {
                return arr.length >= 4; // minimum 4 item
            },
            message: 'At least 4 images are required.'
        }
    }
}, {timestamps: true})

const Property = mongoose.model<PropertyInterface>('Property', propertySchema)

export default Property