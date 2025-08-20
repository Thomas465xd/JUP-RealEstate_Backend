import type { Request, Response } from "express";


//TODO Work in the FeaturedController
export class FeaturedController {
    //? Get all categories
    static getCategories = async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    //? Get a single category by it's id
    static getCategoryById = async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    //? Create a new category
    static createCategory = async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
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