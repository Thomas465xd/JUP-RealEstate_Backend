import { Router } from "express";
import { body, param } from "express-validator";
import { AuthController } from "../controllers/AuthController";

const router = Router();

// Admin Auth Routes

/* Create Account */
router.get("/get-users", 
    AuthController.getUsers
)


export default router