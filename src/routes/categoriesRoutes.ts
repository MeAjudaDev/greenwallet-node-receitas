import { Router } from 'express'
import CategoriesController from '../controllers/CategoriesController'

const transactionsRoutes = Router()

transactionsRoutes.get('/', CategoriesController.index)
transactionsRoutes.get('/:id', CategoriesController.index)
transactionsRoutes.post('/:idUser', CategoriesController.create)
transactionsRoutes.put('/:idUser/:idCategory', CategoriesController.update)
transactionsRoutes.delete('/:idUser/:idCategory', CategoriesController.delete)

export default transactionsRoutes
