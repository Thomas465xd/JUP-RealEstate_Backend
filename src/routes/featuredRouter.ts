import { Router } from "express";
import { body, param } from "express-validator";
import { FeaturedController } from "../controllers/FeaturedController";
import { handleInputErrors } from "../middleware/validation";
import { requireAuth, requireAdmin, requireRoles, optionalAuth } from "../middleware/auth";


const router = Router();

//! Featured Properties Routes | ADMIN
//TODO: Implement featured properties fundamental routes

//? Get all categories
router.get("/", 
    handleInputErrors, 
    FeaturedController.getCategories
)

//? Get categories (or category) by Name
router.get("/search/:slug", 
    param("slug")
        .notEmpty()
        .withMessage("El nombre de la categoría es obligatorio"),
    handleInputErrors, 
    FeaturedController.getCategoryByName
)

//? Get a single category by it's id
router.get("/:id", 
    handleInputErrors, 
    FeaturedController.getCategoryById
)

//? Create a new category
router.post("/", 
    body("categoryName")
        .notEmpty()
        .withMessage("El Nombre de la Categoría es Obligatorio"),
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.createCategory
)

//? Edit category by it's id
router.patch("/:id", 
    body("categoryName")
        .optional()
        .notEmpty()
        .withMessage("El Nombre de la Categoría es Obligatorio"),
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.editCategory
)

//? Delete Category
router.delete("/:id", 
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.deleteCategory
)

//^ Get all Featured properties grouped by categories
router.get("/properties", 
    handleInputErrors, 
    FeaturedController.getPropertiesByCategories
)

//^ Get properties for a given category
router.get("/properties/:id", 
    handleInputErrors, 
    FeaturedController.getPropertiesByCategory
)

//^ Asign Property to category
router.patch("/properties/asign/:id", 
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.asignProperty
)

//^ Deasign Property to category 
router.delete("/properties/remove/:id", 
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.removeProperty
)

//^ Asign Multiple properties to single category
router.patch("/properties/properties/bulk", 
    //!requireAuth, turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    //!requireAdmin,  turned off for development | UNCOMMENT WHEN READY FOR PRODUCTION
    handleInputErrors, 
    FeaturedController.asignMultipleProperties
)

export default router