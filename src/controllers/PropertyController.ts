import type { Request, Response } from "express";
import Property from "../models/Property";


//TODO Work in the PropertyController
export class PropertyController {
    //* Get all Registered Properties (accepts pagination and limits) ✅
    static getProperties = async (req: Request, res: Response) => {
        try {
            // Get the page and perPage query parameters (default values if not provided)
            const page = parseInt(req.query.page as string) || 1;
            const perPage = parseInt(req.query.perPage as string) || 10

            // Calculate skip and limit for pagination
            const skip = (page - 1) * perPage;
            const limit = perPage;

            // Get total number of properties
            const totalProperties = await Property.countDocuments()

            // Get all registered Properties
            const properties = await Property.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })

            // Calculate the total number of pages
            const totalPages = Math.ceil(totalProperties / perPage)

            // Return a successful server response
            res.status(200).json({ totalProperties, totalPages, currentPage: page, perPage, properties})
        } catch (error) {
            res.status(500).json({ message: "Server Error when Retrieving Properties" })
        }
    }

    //* Get a Property by It's ID (ObjectId) ✅
    static getPropertyById = async (req: Request, res: Response) => {
        try {
            // Destructure the id from the params
            const { id } = req.params;

            // Get the property by it's id
            const property = await Property.findById(id)

            // If property is not found throw error
            if(!property) {
                const error = new Error(`Propiedad no Encontrada`);
                res.status(404).json({ message: error.message });
                return
            }

            res.status(200).json({ property })
        } catch (error) {
            res.status(500).json({ message: "Could not Get Property" })
        }
    }

    //* Get a Property by Name
    static getPropertiesByName = async (req: Request, res: Response) => {
        try {
            const { searchTerm } = req.params;

            const properties = await Property.find({
                title: { $regex: searchTerm, $options: "i" }, // no ^
            });

            // Check for empty array instead of null
            if (properties.length === 0) {
                res.status(404).json({ message: `No hay resultados para "${searchTerm}"` });
                return
            }

            res.status(200).json({ properties });
        } catch (error) {
            res.status(500).json({ message: "Could not Get Property" });
            return
        }
    };
    //^ Create a New Property | Required Admin Role ✅
    static createProperty = async (req: Request, res: Response) => {
        try {
            // Create a new Property Instance
            const property = new Property(req.body); 

            // Validate the property data
            const errors = property.validateSync();
            if (errors) {
                res.status(400).json({ message: "Validation Error when Creating Property", errors})
                console.log(errors)
                return;
            }

            // Save the property to the database
            await property.save(); 


            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error when Creating Property" })
        }
    }

    //? Edit a Property | Required Admin Role ✅
    static editProperty = async (req: Request, res: Response) => {
        try {
            // Destructure id from params 
            const { id } = req.params; 

            //destructure body from request
            const propertyData = req.body; 

            // Find and update the property
            const updatedProperty = await Property.findByIdAndUpdate(
                id,
                propertyData,
                { new: true, runValidators: true } // new: true returns the updated doc
            );

            if (!updatedProperty) {
                res.status(404).json({ message: `Property with ID: ${id} not found` });
                return;
            }

            res.status(200).json({
                message: "Property updated successfully",
                property: updatedProperty
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error when Editing Property" })
        }
    }

    //! Delete a Property | Required Admin Role ✅
    static deleteProperty = async (req: Request, res: Response) => {
        try {
            // Destructure id from url params
            const { id } = req.params; 

            // Find and delete the property
            const deleteProperty = await Property.findByIdAndDelete(id);
            if (!deleteProperty) {
                res.status(404).json({ message: `Property with ID: ${id} not found` });
                return;
            }

            // Respond with a success message
            res.status(200).json({ message: "Property Deleted Successfully" }) // 204 code indicates successful deletion with no content
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error when Deleting Property" })
        }
    }
}