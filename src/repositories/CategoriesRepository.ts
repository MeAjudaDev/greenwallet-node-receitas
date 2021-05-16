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

  async deleteCategory (idCategory: any) {
    return await this.delete({ id: idCategory })
  }

  async updateCategory (body: any) {
    return ''
  }
}
