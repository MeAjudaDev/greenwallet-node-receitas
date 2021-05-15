import Categories from '../models/CategoriesModel'
import { ResponseReturnError } from './Errors'

export interface CategoryGETResponse{
  message: string
  body?: Array<Categories>
  errors?: ResponseReturnError
}
