import { Router } from 'express'
import {
  showRules,
  createRules,
  updateRules,
  deleteRules,
  indexRules,
  validate
} from '../validators/CategoryValidators'
import CategoriesController from '../controllers/CategoriesController'

const categoriesRoutes = Router()

categoriesRoutes.get('/', indexRules(), validate, CategoriesController.index)
categoriesRoutes.get('/:idCategory', showRules(), validate, CategoriesController.show)
categoriesRoutes.post('/', createRules(), validate, CategoriesController.create)
categoriesRoutes.put('/:idUser/:idCategory', updateRules(), validate, CategoriesController.update)
categoriesRoutes.delete('/:idUser/:idCategory', deleteRules(), validate, CategoriesController.delete)

export default categoriesRoutes
