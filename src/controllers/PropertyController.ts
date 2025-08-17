import type { Request, Response } from "express";
import Property from "../models/Property";


//TODO Work in the PropertyController
export class PropertyController {
    //* Get all Registered Properties (accepts pagination and limits)
    static getProperties = async (req: Request, res: Response) => {
        try {
            

            res.status(200).json()
        } catch (error) {
            res.status(500).json({ message: "Server Error when Retrieving Properties" })
        }
    }

    //* Get a Property by It's ID (ObjectId)
    static getPropertyById = async (req: Request, res: Response) => {
        try {

            res.status(200).json()
        } catch (error) {
            res.status(500).json({ message: "Could not Get Property" })
        }
    }
    
    //^ Create a New Property | Required Admin Role
    static createProperty = async (req: Request, res: Response) => {
        try {
            // Create a new Property Instance
            const property = new Property(req.body); 

            // Validate the property data
            const errors = property.validateSync();
            if (errors) {
                res.status(400).json({ message: "Validation Error when Creating Property", errors})
                return;
            }

            // Save the property to the database
            await property.save(); 


            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error when Creating Property" })
        }
    }

    //? Edit a Property | Required Admin Role
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

    //! Delete a Property | Required Admin Role
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