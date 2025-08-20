import type { Request, Response } from "express";
import Featured from "../models/Featured";
import { FeaturedInterface } from "../models/Featured";


//TODO Work in the FeaturedController
export class FeaturedController {
    //? Get all categories
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

    //? Get categories by slug pattern
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

    //? Get Category by it's id 
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

    //? Create a new category
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

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    //? Delete Category
    static deleteCategory = async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    //^ Get all Featured properties grouped by category
    static getPropertiesByCategories = async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    //^ Get properties for a given category
    static getPropertiesByCategory= async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }


    //^ Asign Property to category 
    static asignProperty = async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    //^ Deasign Property to category 
    static removeProperty = async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    //^ Asign Multiple properties to single category
    static asignMultipleProperties = async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}