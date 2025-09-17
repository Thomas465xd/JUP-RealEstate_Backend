import { Router } from "express";
import { body, param } from "express-validator";
import { PropertyController } from "../controllers/PropertyController";
import { handleInputErrors } from "../middleware/validation";
import { requireAuth, requireAdmin, requireRoles, optionalAuth } from "../middleware/auth";


const router = Router();

//! Property Routes
//TODO: Implement property fundamental routes

/** Get all Properties */
router.get("/", 
    optionalAuth,
    handleInputErrors, 
    PropertyController.getProperties
)

/** Get a Property by it's ID (ObjectId) */
router.get("/:id", 
    param("id")
    .isMongoId().withMessage("ID de propiedad Inválido")
    .notEmpty().withMessage("El ID de la propiedad es obligatorio"),
    optionalAuth, 
    handleInputErrors,
    PropertyController.getPropertyById
)

/** Get properties by name */
router.get("/name/:searchTerm", 
    param("searchTerm")
        .notEmpty().withMessage("El nombre de la propiedad es obligatorio"),
    optionalAuth, 
    handleInputErrors,
    PropertyController.getPropertiesByName
)

/** Create Property */
router.post("/create", 
    body("title")
        .notEmpty().withMessage("El título es obligatorio"),
    body("description")
        .notEmpty().withMessage("La descripción es obligatoria"),
    body("operation")
        .notEmpty().withMessage("La operación no puede ir vacía")
        .isIn([
            "En Arriendo", 
            "En Venta"
        ]).withMessage("Tipo de Operación inválida"),
    body("type")
        .isIn([
            // "house", 
            // "apartment", 
            // "land", 
            // "commercial", 
            // "office", 
            "casa", 
            "departamento",
            "parcela", 
            "sitio", 
            "oficina", 
            "comercial"
        ]).withMessage("Tipo de propiedad inválido"),
    body("price")
        .isInt({ min: 1 }).withMessage("El precio tiene que ser un número"),
    body("address")
        .notEmpty().withMessage("La dirección es obligatoria"),
    body("status")
        .optional().isIn([
            // "available", 
            // "sold", 
            // "pending", 
            "disponible", 
            "vendida", 
            "pendiente"
        ]).withMessage("Estado de propiedad inválido"),
    body("dorms")
        .isInt({ min: 0 }).withMessage("Número de dormitorios inválido"),
    body("bathrooms")
        .isInt({ min: 0 }).withMessage("Número de baños inválido"),
    body("parkingSpaces")
        .optional().isInt({ min: 0 }).withMessage("Número de espacios de estacionamiento inválido"),
    body("area")
        .isFloat({ min: 0 }).withMessage("Área inválida"), 
    body("region")
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
        ]).withMessage("Área inválida"),
    body("cityArea")
        .notEmpty().withMessage("El área de la ciudad es obligatoria"),
    body("condo")
        .optional().isBoolean().withMessage("Especifique si es condominio o no"),
    body("imageUrls")
        .isArray({ min: 4 }).withMessage("Debe enviar al menos 4 imágenes")
        .custom((arr) => arr.every(url => typeof url === "string" && url.startsWith("http")))
        .withMessage("Todos los elementos deben ser URLs válidas"),
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors,
    PropertyController.createProperty
)

/** Edit Property */
router.patch("/edit/:id", 
    param("id")
        .isMongoId().withMessage("ID de propiedad Inválido")
        .notEmpty().withMessage("El ID de la propiedad es obligatorio"),
    body("title")
        .optional().notEmpty().withMessage("El título es obligatorio"),
    body("description")
        .optional().notEmpty().withMessage("La descripción es obligatoria"),
    body("type").optional().isIn([
        // "house", 
        // "apartment", 
        // "land", 
        // "commercial", 
        // "office", 
        "casa", 
        "departamento",
        "parcela", 
        "sitio", 
        "oficina", 
        "comercial"
    ]).withMessage("Tipo de propiedad inválido"),
    body("operation")
        .optional().notEmpty().withMessage("La operación no puede ir vacía")
        .isIn([
            "En Arriendo", 
            "En Venta"
        ]).withMessage("Tipo de Operación inválida"),
    body("price")
        .optional().isInt({ min: 1}).withMessage("El precio es obligatorio"),
    body("address")
        .optional().notEmpty().withMessage("La dirección es obligatoria"),
    body("status")
        .optional().isIn([
            // "available", 
            // "sold", 
            // "pending", 
            "disponible", 
            "vendida", 
            "pendiente"
        ]).withMessage("Estado de propiedad inválido"),
    body("dorms")
        .optional().isInt({ min: 0 }).withMessage("Número de dormitorios inválido"),
    body("bathrooms")
        .optional().isInt({ min: 0 }).withMessage("Número de baños inválido"),
    body("parkingSpaces")
        .optional().isInt({ min: 0 }).withMessage("Número de espacios de estacionamiento inválido"),
    body("area")
        .optional().isFloat({ min: 0 }).withMessage("Área inválida"), 
    body("region")
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
        ]).withMessage("Área inválida"),
    body("cityArea")
        .optional().notEmpty().withMessage("El área de la ciudad es obligatoria"),
    body("condo")
        .optional().isBoolean().withMessage("Especifique si es condominio o no"),
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    PropertyController.editProperty
)

/** Delete Property */
router.delete("/delete/:id", 
    param("id")
        .isMongoId().withMessage("ID de propiedad Inválido")
        .notEmpty().withMessage("El ID de la propiedad es obligatorio"),
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors,
    PropertyController.deleteProperty
)


export default router