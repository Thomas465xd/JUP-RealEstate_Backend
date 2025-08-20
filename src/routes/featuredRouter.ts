import { Router } from "express";
import { body } from "express-validator";
import { PropertyController } from "../controllers/PropertyController";
import { handleInputErrors } from "../middleware/validation";
import { requireAuth, requireAdmin, requireRoles, optionalAuth } from "../middleware/auth";


const router = Router();

//! Featured Properties Routes
//TODO: Implement featured properties fundamental routes


router.post("/", 

)


export default router