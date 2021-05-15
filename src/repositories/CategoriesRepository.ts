import { EntityRepository, Repository } from 'typeorm'
import CategoriesModel from '../models/CategoriesModel'

@EntityRepository(CategoriesModel)
export default class TransactionsRepository extends Repository<CategoriesModel> {}
