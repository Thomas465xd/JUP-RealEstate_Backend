import type { Request, Response } from "express";
import Featured from "../models/Featured";
import { FeaturedInterface } from "../models/Featured";
import Property from "../models/Property";


//TODO Work in the FeaturedController
export class FeaturedController {
    //? Get all categories ✅
    static getCategories = async (req: Request, res: Response) => {
        try {
            // Get the page and perPage query parameters (default values if not provided)
            const page = Math.max(parseInt(req.query.page as string) || 1, 1);
            const perPage = parseInt(req.query.perPage as string) || 10

            // Calculate skip and limit for pagination
            const skip = (page - 1) * perPage;
            const limit = perPage;

            // Get total number of categories
            const totalCategories = await Featured.countDocuments()

            // Get all registered Categories
            const categories = await Featured.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })

            // Calculate the total number of pages
            const totalPages = Math.ceil(totalCategories / perPage)

            // Return a successful server response
            res.status(200).json({ totalCategories, totalPages, currentPage: page, perPage, categories})
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
            console.error("Error when retrieving Categories: ", error )
        }
    }

    //? Get categories by slug pattern ✅
    static getCategoryByName = async (req: Request, res: Response) => {
        try {
            const { slug } = req.params;

            // Search for categories that start with the provided slug
            const categories = await Featured.find({
                slug: { $regex: `^${slug}`, $options: 'i' }
            }).populate('properties');

            if (categories.length === 0) {
                res.status(404).json({ 
                    message: "No se encontraron categorías",
                    searchTerm: slug 
                });

                return
            }

            res.status(200).json({ 
                categories,
                searchTerm: slug,
                count: categories.length
            });
        } catch (error) {
            console.error("Error when retrieving categories: ", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    //? Get Category by it's id ✅
    static getCategoryById = async (req: Request, res: Response) => {
        try {
            // Destructure categoryName from query params
            const { id } = req.params; 

            // Get category by it's Id
            const category = await Featured.findById(id)

            // If category is not found throw error
            if(!category) {
                const error = new Error(`Categoría no Encontrada`);
                res.status(404).json({ message: error.message });
                return
            }

            res.status(200).json({ category, categoryId: id })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
            console.error("Error when retrieving Category: ", error )
        }
    }

    //? Create a new category ✅
    static createCategory = async (req: Request, res: Response) => {
        try {
            // Destructure the category name from the request body
            const { categoryName } = req.body;

            // Check if the category already exists
            const categoryExists = await Featured.findOne({ name: categoryName })

            if(categoryExists) {
                const error = new Error("Ya existe una categoría con ese nombre");
                res.status(400).json({ message: error.message });
                return;
            }

            // Generate slug from name
            const slug = categoryName.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');


            // Create new Category
            const category = new Featured({
                name: categoryName, 
                slug: slug, 
                properties: []
            });

            await category.save();

            res.status(201).json({ 
                message: "Categoría creada correctamente", 
                category: {
                    id: category._id,
                    name: category.name, 
                    slug: category.slug
                }
            })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
            console.error("Error creating category: ", error )
        }
    }

    //? Edit category
    static editCategory = async (req: Request, res: Response) => {
        try {
            // Destructure the category id from the query params
            const { id } = req.params; 

            // Destructure the categoryName or isActive body params
            const categoryData = {...req.body}; 

            // If categoryName is being updated, generate new slug
            if (categoryData.categoryName) {
                // Generate slug from the new category name
                const slug = categoryData.categoryName.toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
                    .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens

                // Update the category data with the new slug
                categoryData.name = categoryData.categoryName; // Update name field
                categoryData.slug = slug;
                delete categoryData.categoryName; // Remove categoryName as it's not in schema
            }

            // Find and update the category
            const updatedCategory = await Featured.findByIdAndUpdate(
                id,
                categoryData,
                { new: true, runValidators: true } // new: true returns the updated doc
            );

            if (!updatedCategory) {
                res.status(404).json({ 
                    message: `Category with ID: ${id} not found` 
                });

                return
            }

            res.status(200).json({
                message: "Categoría actualizada exitosamente",
                category: {
                    id: updatedCategory._id,
                    name: updatedCategory.name,
                    slug: updatedCategory.slug,
                    isActive: updatedCategory.isActive
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
            console.error("Error when editing Category: ", error )
        }
    }

    //? Delete Category
    static deleteCategory = async (req: Request, res: Response) => {
        try {
            // Destructure id from url params
            const { id } = req.params; 

            // Find and delete the property
            const deleteCategory = await Featured.findByIdAndDelete(id);
            if (!deleteCategory) {
                res.status(404).json({ message: `Categoría con ID: ${id} no Encontrada` });
                return;
            }

            // Respond with a success message
            res.status(200).json({ message: "Categoría eliminada Correctamente" }) // 204 code indicates successful deletion with no content
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
            console.error("Error when deleting Category: ", error )
        }
    } 

    //^ Get all Featured properties grouped by category
    static getPropertiesByCategories = async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
            console.error("Error when retrieving properties by Categories: ", error )
        }
    }

    //^ Get properties for a given category
    static getPropertiesByCategory= async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
            console.error("Error when retrieving properties from Category: ", error )
        }
    }


    //^ Asign Property to category 
    static assignProperty = async (req: Request, res: Response) => {
        try {
            // Get the category id from url params
            const { id } = req.params; 

            // Destructure the propertyId from the body of the request
            const { propertyId } = req.body; 

            // Get property by Id to validate it exists
            const propertyExists = await Property.findById(propertyId); 

            // If property is not found throw error
            if (!propertyExists) {
                const error = new Error(`Propiedad no Encontrada`);
                res.status(404).json({ message: error.message });
                return
            }

            // Check if property is already assigned to this category
            const category = await Featured.findById(id);
            if (!category) {
                res.status(404).json({ 
                    message: "Categoría no encontrada" 
                });

                return
            }

            // Check if property is already in the category
            if (category.properties.includes(propertyId)) {
                const error = new Error(`La propiedad ya esta asignada a esta categoría`);
                res.status(404).json({ message: error.message });
                return
            }

            // Add property to category using $addToSet (prevents duplicates)
            const updatedCategory = await Featured.findByIdAndUpdate(
                id,
                { $addToSet: { properties: propertyId } }, // $addToSet prevents duplicates
                { new: true, runValidators: true }
            ).populate('properties'); // Populate to return full property details

            res.status(200).json({
                message: "Propiedad asignada correctamente",
                category: {
                    id: updatedCategory._id,
                    name: updatedCategory.name,
                    slug: updatedCategory.slug,
                    properties: updatedCategory.properties,
                    isActive: updatedCategory.isActive
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
            console.error("Error when assigning property to Category: ", error )
        }
    }

    //^ Deasign Property from category 
    static removeProperty = async (req: Request, res: Response) => {
        try {
            // Get the category id from url params
            const { id } = req.params; 

            // Destructure the propertyId from the body of the request
            const { propertyId } = req.body; 

            // Get property by Id to validate it exists
            const propertyExists = await Property.findById(propertyId); 

            // If property is not found throw error
            if (!propertyExists) {
                const error = new Error(`Propiedad no Encontrada`);
                res.status(404).json({ message: error.message });
                return
            }

            // Check if property is already assigned to this category
            const category = await Featured.findById(id);
            if (!category) {
                res.status(404).json({ 
                    message: "Categoría no encontrada" 
                });

                return
            }

            // Check if property is not in the category
            if (!category.properties.includes(propertyId)) {
                const error = new Error(`La propiedad no esta en esta categoría`);
                res.status(404).json({ message: error.message });
                return
            }

            // Remove property from category
            const updatedCategory = await Featured.findByIdAndUpdate(
                id, 
                { $pull: { properties: propertyId } }, // $pull removes the property from array
                { new: true, runValidators: true }
            ).populate("properties")

            res.status(200).json({
                message: "Propiedad eliminada exitosamente",
                category: {
                    id: updatedCategory._id,
                    name: updatedCategory.name,
                    slug: updatedCategory.slug,
                    properties: updatedCategory.properties,
                    isActive: updatedCategory.isActive
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
            console.error("Error when removing property from Category: ", error )
        }
    }

    //^ Asign Multiple properties to single category
    static asignMultipleProperties = async (req: Request, res: Response) => {
        try {
            // Get the category id from url params
            const { id } = req.params; 

            // Destructure the propertiesId from the body of the request
            const { propertiesIds } = req.body; 

            // Get properties by Id to validate it exists
            const properties = await Property.find({
                _id: { $in: propertiesIds } // $in returns all documents whose _id matches any in the list
            })

            // Check if all properties were found
            if (properties.length !== propertiesIds.length) {
                const foundIds = properties.map(p => p._id.toString());
                const notFoundIds = propertiesIds.filter(id => !foundIds.includes(id));
                
                res.status(404).json({ 
                    message: "Algunas propiedades no fueron encontradas",
                    notFoundIds: notFoundIds
                });

                return;
            }

            // Check if property is already assigned to this category
            const category = await Featured.findById(id);
            if (!category) {
                res.status(404).json({ 
                    message: "Categoría no encontrada" 
                });

                return
            }

            // Filter out properties that are already assigned to prevent duplicates
            const existingPropertyIds = category.properties.map(p => p.toString());
            const newPropertyIds = propertiesIds.filter(propId => 
                !existingPropertyIds.includes(propId)
            );

            // If no new properties to add
            if (newPropertyIds.length === 0) {
                res.status(400).json({ 
                    message: "Todas las propiedades ya están asignadas a esta categoría" 
                });

                return;
            }

            // Add multiple properties to category using $addToSet with $each
            const updatedCategory = await Featured.findByIdAndUpdate(
                id,
                { $addToSet: { properties: { $each: newPropertyIds } } }, // $each adds multiple values
                { new: true, runValidators: true }
            ).populate('properties');

            res.status(200).json({
                message: `${newPropertyIds.length} propiedades asignadas correctamente`,
                assignedCount: newPropertyIds.length,
                skippedCount: propertiesIds.length - newPropertyIds.length,
                category: {
                    id: updatedCategory._id,
                    name: updatedCategory.name,
                    slug: updatedCategory.slug,
                    properties: updatedCategory.properties,
                    isActive: updatedCategory.isActive
                },
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
            console.error("Error when assigning multiple properties to Category: ", error )
        }
    }

    //TODO: Might add delete multiple properties bulk operation
}