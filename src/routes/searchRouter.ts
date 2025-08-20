import { Router } from "express";
import { param } from "express-validator";
import { SearchController } from "../controllers/SearchController";
import { handleInputErrors } from "../middleware/validation";
import { requireAuth, requireAdmin, requireRoles, optionalAuth } from "../middleware/auth";


const router = Router();

//! Advanced Search Property Routes
//TODO: Implement searching fundamental routes & validation


router.get("/",
    param("status")
        .optional()
        .isIn(["available", "sold", "pending"])
        .withMessage("Estado de propiedad inválido"),
    param("type")
        .optional()
        .isIn([
            "house", 
            "apartment", 
            "land", 
            "commercial", 
            "office"
        ])
        .withMessage("Tipo de propiedad inválido"),
    param("region")    
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
    param("cityArea")
        .optional(), 
    param("condo")
        .optional()
        .isBoolean()
        .withMessage("Especifique si es condominio o no"),
    param("dorms")
        .optional()
        .isInt({min: 0})
        .withMessage("La cantidad de dormitiorios no puede ser menor a cero"), 
    param("bathrooms")
        .optional().isInt({min: 0})
        .withMessage("La cantidad de baños no puede ser menor a cero"),  
    param("parkingSpaces")
        .optional()
        .isInt({min: 0})
        .withMessage("La cantidad de estacionamientos no puede ser menor a cero"), 
    param("minPrice")
        .optional()
        .isInt({min: 0})
        .withMessage("El precio minimo no puede ser menor a cero"), 
    param("maxPrice")
        .optional()
        .isInt({min: 0})
        .withMessage("El Precio máximo no puede ser menor a cero"),
    param("sortBy")
        .optional()
        .isIn(["price"])
        .withMessage("The sort criteria selected does not exist"),
    param("sortOrder")
        .optional()
        .isIn(["asc", "desc"])
        .withMessage("sort order must be either 'asc' or 'desc'"),
    optionalAuth,
    handleInputErrors,
    SearchController.advancedSearch
)


export default router