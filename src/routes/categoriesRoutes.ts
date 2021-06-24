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

categoriesRoutes.get('/user/:userid', indexRules(), validate, CategoriesController.index)
categoriesRoutes.get('/user/:userid/category/:idCategory', showRules(), validate, CategoriesController.show)
categoriesRoutes.post('/', createRules(), validate, CategoriesController.create)
categoriesRoutes.put('/user/:idUser/category/:idCategory', updateRules(), validate, CategoriesController.update)
categoriesRoutes.delete('/user/:idUser/category/:idCategory', deleteRules(), validate, CategoriesController.delete)

export default categoriesRoutes
