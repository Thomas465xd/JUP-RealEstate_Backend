import type { Request, Response } from "express";


//TODO Work in the PropertyController
export class SearchController {
    static createProperty = async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Propiedad creada Exitosamente" })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}