import type { Request, Response } from "express";


export class PropertyController {
    static createProperty = async (req: Request, res: Response) => {
        try {

            res.status(201).json({ message: "Usuario Creado Exitosamente, Hemos enviado su solicitud de verificación." })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}