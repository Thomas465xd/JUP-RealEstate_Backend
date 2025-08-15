import { clerkClient } from "@clerk/express";
import type { Request, Response } from "express";


export class AuthController {
    static getUsers = async (req: Request, res: Response) => {
        try {

            const getUsers = await clerkClient.users.getUserList(); 

            res.status(201).json( getUsers )
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}