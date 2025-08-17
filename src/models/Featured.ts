import { Schema, model, Types, Document } from "mongoose";

interface FeaturedCategory {
	name: string; // e.g. "Best Price", "Most Loved"
	properties: Types.ObjectId[]; // References to Property documents
}

interface FeaturedInterface extends Document {
	categories: FeaturedCategory[];
}

const FeaturedSchema = new Schema<FeaturedInterface>({
	categories: [
		{
			name: { type: String, required: true, unique: true },
			properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
		},
	],
});

export const Featured = model<FeaturedInterface>("Featured", FeaturedSchema);
