import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { body,param } from 'express-validator'
import { handleInputErrors } from './middleware'
const router = Router()


//Routing
router.get('/', getProducts)
router.get('/:id', 

    param('id').isInt().withMessage('ID NO VALIDO'),
    handleInputErrors,
    getProductById
)

router.post('/',

        //Validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto es invalido o nulo'),
    body('price')
        .isNumeric().withMessage("El precio no es valido")
        .notEmpty().withMessage('El precio del producto es nulo')
        .custom( value => value > 0 ).withMessage('El precio no puede ser negativo'),
    handleInputErrors,
    createProduct)


router.put('/:id', 
    param('id').isInt().withMessage('ID NO VALIDO'),
    body('name')
        .notEmpty().withMessage('El nombre del producto es invalido o nulo'),
    body('price')
        .isNumeric().withMessage("El precio no es valido")
        .notEmpty().withMessage('El precio del producto es nulo')
        .custom( value => value > 0 ).withMessage('El precio no puede ser negativo'),
    body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

router.patch('/:id',
    param('id').isInt().withMessage('ID NO VALIDO'),
    handleInputErrors,
    updateAvailability
)


router.delete('/:id',
    param('id').isInt().withMessage('ID NO VALIDO'),
    handleInputErrors,
    deleteProduct
)

export default router
