import { EntityRepository, Repository } from 'typeorm'
import CategoriesModel from '../models/CategoriesModel'

@EntityRepository(CategoriesModel)
export default class CategoriesRepository extends Repository<CategoriesModel> {
  async findAll () {
    return await this.find()
  }

  async findSingle (id: string) {
    return await this.findOne(id)
  }

  async createCategory (body: any) {
    return await this.save(body)
  }

  async deleteCategory (body: any) {
    return ''
  }

  async updateCategory (body: any) {
    return ''
  }
}
