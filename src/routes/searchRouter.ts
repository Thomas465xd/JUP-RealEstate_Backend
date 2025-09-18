import { Router } from "express";
import { query } from "express-validator";
import { SearchController } from "../controllers/SearchController";
import { handleInputErrors } from "../middleware/validation";
import { requireAuth, requireAdmin, requireRoles, optionalAuth } from "../middleware/auth";


const router = Router();

//! Advanced Search Property Routes
//TODO: Implement searching fundamental routes & validation


router.get("/",
    query("searchCode")
        .isMongoId().withMessage("ID de propiedad Inválido")
        .optional(),
    query("status")
        .optional()
        .isIn([
            // "available", 
            // "sold", 
            // "pending", 
            // Actual model values
            "disponible", 
            "vendida", 
            "pendiente"
        ])
        .withMessage("Estado de propiedad inválido"),
    query("type")
        .optional()
        .isIn([
            // "house", 
            // "apartment", 
            // "land", 
            // "commercial", 
            // "office", 
            // Actual model values
            "casa", 
            "departamento",
            "parcela", 
            "sitio", 
            "oficina", 
            "comercial"
        ]).withMessage("Tipo de propiedad inválido"),
    query("operation")
        .optional()
        .isIn([
            "En Arriendo", 
            "En Venta"
        ]).withMessage("Tipo de Operación inválida"),
    query("region")    
        .optional()
        .isIn([
            "Arica y Parinacota",
            "Tarapacá",
            "Antofagasta",
            "Atacama",
            "Coquimbo",
            "Valparaíso",
            "Metropolitana de Santiago",
            "O'Higgins",
            "Maule",
            "Ñuble",
            "Biobío",
            "La Araucanía",
            "Los Ríos",
            "Los Lagos",
            "Aysén",
            "Magallanes"
        ])
        .withMessage("Área inválida"),
    query("cityArea")
        .optional(), 
    query("condo")
        .optional()
        .isBoolean()
        .withMessage("Especifique si es condominio o no"),
    query("dorms")
        .optional()
        .isInt({min: 0})
        .withMessage("La cantidad de dormitiorios no puede ser menor a cero"), 
    query("bathrooms")
        .optional().isInt({min: 0})
        .withMessage("La cantidad de baños no puede ser menor a cero"),  
    query("parkingSpaces")
        .optional()
        .isInt({min: 0})
        .withMessage("La cantidad de estacionamientos no puede ser menor a cero"), 
    query("minPrice")
        .optional()
        .isInt({min: 0})
        .withMessage("El precio minimo no puede ser menor a cero"), 
    query("maxPrice")
        .optional()
        .isInt({min: 0})
        .withMessage("El Precio máximo no puede ser menor a cero"),
    query("sortBy")
        .optional()
        .isIn(["price"])
        .withMessage("The sort criteria selected does not exist"),
    query("sortOrder")
        .optional()
        .isIn(["asc", "desc"])
        .withMessage("sort order must be either 'asc' or 'desc'"),
    optionalAuth,
    handleInputErrors,
    SearchController.advancedSearch
)


export default router