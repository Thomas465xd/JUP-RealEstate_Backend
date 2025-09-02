import { Router } from "express";
import { body, param } from "express-validator";
import { FeaturedController } from "../controllers/FeaturedController";
import { handleInputErrors } from "../middleware/validation";
import { requireAuth, requireAdmin, requireRoles, optionalAuth } from "../middleware/auth";


const router = Router();

//! Featured Properties Routes | ADMIN
//TODO: Implement featured properties fundamental routes

//^ Get all Featured properties grouped by categories
router.get("/properties", 
    handleInputErrors, 
    FeaturedController.getPropertiesByCategories
);

//^ Get properties for a given category
router.get("/properties/:id", 
    param("id")
        .isMongoId().withMessage("ID de propiedad Inválido")
        .notEmpty().withMessage("El ID de la categoría es obligatorio"),
    handleInputErrors, 
    FeaturedController.getPropertiesByCategory
);

//^ Assign Property to category
router.patch("/properties/:id", 
    param("id")
        .isMongoId().withMessage("ID de categoría Inválido")
        .notEmpty().withMessage("El ID de la categoría es obligatorio"),
    body("propertyId")
        .notEmpty().withMessage("El ID de la propiedad es obligatorio")
        .isMongoId().withMessage("ID de propiedad Inválido"),
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.assignProperty
)

//^ Deasign Property from category 
router.delete("/properties/:id",
    param("id")
        .isMongoId().withMessage("ID de propiedad Inválido")
        .notEmpty().withMessage("El ID de la categoría es obligatorio"),
    body("propertyId")
        .notEmpty().withMessage("El ID de la propiedad es obligatorio")
        .isMongoId().withMessage("ID de propiedad Inválido"),
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.removeProperty
)

//^ Asign Multiple properties to single category
router.patch("/properties/:id/bulk", 
    param("id")
        .notEmpty().withMessage("El ID de la categoría es obligatorio")
        .isMongoId().withMessage("ID de categoría inválido"),
    // Validate body.propertiesIds (must be array of valid MongoIds)
    body("propertiesIds")
        .notEmpty().withMessage("Los ID's de las propiedades no pueden ir vacíos")
        .isArray().withMessage("propertiesIds debe ser un arreglo")
        .custom((arr) => {
            if (!arr.every((id: string) => /^[0-9a-fA-F]{24}$/.test(id))) {
                throw new Error("Todos los IDs de propiedades deben ser ObjectIds válidos");
            }

            return true;
        }),
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.assignMultipleProperties
)

//? Get all categories ✅
router.get("/", 
    handleInputErrors, 
    FeaturedController.getCategories
)

//? Get categories (or category) by Name ✅
router.get("/search/:slug", 
    param("slug")
        .notEmpty()
        .withMessage("El nombre de la categoría es obligatorio"),
    handleInputErrors, 
    FeaturedController.getCategoryByName
)

//? Get a single category by it's id ✅
router.get("/:id", 
    param("id")
        .isMongoId().withMessage("ID de propiedad Inválido")
        .notEmpty().withMessage("El ID de la categoría es obligatorio"),
    handleInputErrors, 
    FeaturedController.getCategoryById
)

//? Create a new category ✅
router.post("/", 
    body("categoryName")
        .notEmpty()
        .withMessage("El Nombre de la Categoría es Obligatorio"),
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.createCategory
)

//? Edit category by it's id ✅
router.patch("/:id", 
    param("id")
        .isMongoId().withMessage("ID de la categoría es Inválido")
        .notEmpty().withMessage("El ID de la categoría es obligatorio"),
    body("categoryName")
        .optional()
        .notEmpty()
        .withMessage("El Nombre de la Categoría es Obligatorio"),
    body("isActive") 
        .optional()
        .isBoolean()
        .withMessage("Especifique si la categoría esta activa o no"),
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.editCategory
)

//? Delete Category ✅
router.delete("/:id", 
    param("id")
        .isMongoId().withMessage("ID de propiedad Inválido")
        .notEmpty().withMessage("El ID de la categoría es obligatorio"),
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.deleteCategory
)


export default router