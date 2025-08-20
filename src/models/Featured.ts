import { Schema, model, Document, Types } from "mongoose";

export interface FeaturedInterface extends Document {
    name: string;
    slug: string;  // URL-friendly version: "best-prices"
    properties: Types.ObjectId[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const FeaturedSchema = new Schema<FeaturedInterface>({
    name: { 
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    properties: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Property" 
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt attributes
});

const Featured = model<FeaturedInterface>("Featured", FeaturedSchema);

export default Featured