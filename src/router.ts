import { Router } from "express"
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

/** 
 * @swagger
 * components:
 *      schemas:
 *          product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: Nombre del Producto
 *                      example: PC Gamer con RGB
 *                  price:
 *                      type: number
 *                      description: Precio del producto
 *                      example: 750
 *                  availability:
 *                      type: boolean
 *                      description: Disponibilidad del producto
 *                      example: true
*/

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Obtiene una lista de productos
 *          tags:
 *              - products
 *          description: Retorna una lista de productos
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/product"
 */

router.get("/", getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Obtener un producto por ID
 *          tags:
 *              - products
 *          description: Retorna un producto basado en ID unico
 *          parameters:
 *              - in: path
 *                name: id
 *                description: El ID del producto a recuperar
 *                required: true
 *                schema:
 *                    type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/product"
 *              404:
 *                  description: Not Found
 *              400: 
 *                  description: Bad Request - Invaild ID     
 * 
 */
router.get("/:id", 
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    getProductsById)

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creacion de nuevo producto
 *          tags:
 *              - products
 *          description: devuelve un nuevo registro en la base de datos
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo"
 *                              price:
 *                                  type: number
 *                                  example: 250   
 *          responses:
 *              201:
 *                  description: Product created successfully
 *              400:
 *                  description: Bad Request - invalid input data
 */

router.post("/", 
    
    body("name").notEmpty().withMessage("El nombre de producto no puede estar vacio"),
    body("price").isNumeric().withMessage("valor no valido").notEmpty().withMessage("El precio de producto no puede estar vacio").custom(value => value > 0).withMessage("Precio no valido"),
    handleInputErrors,
    createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Actualiza un producto con los inputs del usuario
 *          tags:
 *              - products
 *          description: devuelve los productos actualizados
 *          parameters:
 *            - in: path
 *              name: id
 *              description: El ID del producto a recuperar
 *              required: true
 *              schema: 
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo"
 *                              price:
 *                                  type: number
 *                                  example: 250
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/product"
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404: 
 *                  description: Product Not Found
 */

router.put("/:id", 
    param("id").isInt().withMessage("ID no valido"),
    body("name").notEmpty().withMessage("El nombre de producto no puede estar vacio"),
    body("price").isNumeric().withMessage("valor no valido").notEmpty().withMessage("El precio de producto no puede estar vacio").custom(value => value > 0).withMessage("Precio no valido"),
    body("availability").isBoolean().withMessage("Valor para disponibilidad no válido"),
    handleInputErrors,
    updateProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Actualizar la disponibilidad del producto
 *      tags:
 *          - products
 *      description: Devuelve la disponibilidad actualizada
 *      parameters:
 *        - in: path
 *          name: id
 *          description: El ID del producto a recuperar.
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/product"
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

router.patch("/:id", 
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Elimina un producto por su ID
 *          tags:
 *              - products
 *          description: Retorna un mensaje de confirmacion
 *          parameters:
 *            - in: path
 *              name: id
 *              description: El ID del producto a eliminar.
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: "Producto Eliminado"
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
 */


router.delete("/:id", 
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    deleteProduct
)


export default router