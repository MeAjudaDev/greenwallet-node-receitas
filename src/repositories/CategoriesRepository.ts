import { EntityRepository, Repository } from 'typeorm'
import CategoriesModel from '../models/CategoriesModel'

@EntityRepository(CategoriesModel)
export default class CategoriesRepository extends Repository<CategoriesModel> {
  async findAll () {
    return await this.find()
  }

  async findById (id: string) {
    return await this.findOne(id)
  }

  async createCategory (body: any) {
    return await this.save(body)
  }

  async deleteCategory (idCategory: any) {
    return await this.delete({ id: idCategory })
  }

  async updateCategory ({ idUser, idCategory, name, state, type }: any) {
    return await this.update({ id: idCategory }, { user_id: idUser, name, state, type })
  }
}
