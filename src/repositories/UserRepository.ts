import { EntityRepository, Repository } from 'typeorm'
import UserModel from '../models/UserModel'

@EntityRepository(UserModel)
export default class CategoriesRepository extends Repository<UserModel> {
  async findById (userid:number) {
    return await this.findOne({id: userid})
  }
}
