import { Router } from "express";
import { body } from "express-validator";
import { PropertyController } from "../controllers/PropertyController";
import { handleInputErrors } from "../middleware/validation";
import { requireAuth, requireAdmin, requireRoles, optionalAuth } from "../middleware/auth";


const router = Router();

//! Property Routes
//TODO: Implement property fundamental routes

/** Get all Properties */

/** Get a Property by it's ID (ObjectId) */

/** Create Property */
router.post("/create", 
    body("title").notEmpty().withMessage("El título es obligatorio"),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    body("type").isIn(["house", "apartment", "land", "commercial", "office"]).withMessage("Tipo de propiedad inválido"),
    body("price").notEmpty().withMessage("El precio es obligatorio"),
    body("address").notEmpty().withMessage("La dirección es obligatoria"),
    body("status").optional().isIn(["available", "sold", "pending"]).withMessage("Estado de propiedad inválido"),
    body("dorms").isInt({ min: 0 }).withMessage("Número de dormitorios inválido"),
    body("bathrooms").isInt({ min: 0 }).withMessage("Número de baños inválido"),
    body("parkingSpaces").optional().isInt({ min: 0 }).withMessage("Número de espacios de estacionamiento inválido"),
    body("area").isFloat({ min: 0 }).withMessage("Área inválida"), 
    body("region").notEmpty().withMessage("La región es obligatoria"),
    body("cityArea").notEmpty().withMessage("El área de la ciudad es obligatoria"),
    body("condo").optional().isBoolean().withMessage("Especifique si es condominio o no"),
    requireAuth, 
    requireAdmin, 
    handleInputErrors,
    PropertyController.createProperty
)

/** Edit Property */

/** Delete Property */


export default router