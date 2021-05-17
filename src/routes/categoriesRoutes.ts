import { Router } from 'express'
import CategoriesController from '../controllers/CategoriesController'

const categoriesRoutes = Router()

categoriesRoutes.get('/', CategoriesController.index)
categoriesRoutes.get('/:idCategory', CategoriesController.show)
categoriesRoutes.post('/', CategoriesController.create)
categoriesRoutes.put('/:idUser/:idCategory', CategoriesController.update)
categoriesRoutes.delete('/:idUser/:idCategory', CategoriesController.delete)

export default categoriesRoutes
