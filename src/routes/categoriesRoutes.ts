import { Router } from 'express'
import {
  showRules,
  createRules,
  updateRules,
  deleteRules,
  indexRules,
  validate
} from '../validators/CategoryValidators'
import { userExists } from '../middlewares/User'
import CategoriesController from '../controllers/CategoriesController'

const categoriesRoutes = Router()

categoriesRoutes.get('/user/:user_id', indexRules(), validate, userExists, CategoriesController.index)
categoriesRoutes.get('/user/:user_id/category/:idCategory', showRules(), validate, userExists, CategoriesController.show)
categoriesRoutes.post('/', createRules(), validate, userExists, CategoriesController.create)
categoriesRoutes.put('/user/:user_id/category/:idCategory', updateRules(), validate, userExists, CategoriesController.update)
categoriesRoutes.delete('/user/:user_id/category/:idCategory', deleteRules(), validate, userExists, CategoriesController.delete)

export default categoriesRoutes
