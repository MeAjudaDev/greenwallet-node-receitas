import { getCustomRepository } from 'typeorm'
import CategoriesRepository from '../../repositories/CategoriesRepository'



const fillDatabase = async() =>{
  const categoryRepository = getCustomRepository(CategoriesRepository)
  
  await categoryRepository.createCategory({user_id: 1, name: "Linkin Park", type: "E", state: "A"})
}

export default fillDatabase