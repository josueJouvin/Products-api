import { Router } from "express"
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

router.get("/", getProducts)
router.get("/:id", 
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    getProductsById)


router.post("/", 
    
    body("name").notEmpty().withMessage("El nombre de producto no puede estar vacio"),
    body("price").isNumeric().withMessage("valor no valido").notEmpty().withMessage("El precio de producto no puede estar vacio").custom(value => value > 0).withMessage("Precio no valido"),
    handleInputErrors,
    createProduct)

router.put("/:id", 
    param("id").isInt().withMessage("ID no valido"),
    body("name").notEmpty().withMessage("El nombre de producto no puede estar vacio"),
    body("price").isNumeric().withMessage("valor no valido").notEmpty().withMessage("El precio de producto no puede estar vacio").custom(value => value > 0).withMessage("Precio no valido"),
    body("availability").isBoolean().withMessage("Valor para disponibilidad no válido"),
    handleInputErrors,
    updateProduct)

router.patch("/:id", 
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    updateAvailability
)

router.delete("/:id", 
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    deleteProduct
)


export default router