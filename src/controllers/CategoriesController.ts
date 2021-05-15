import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import CategoriesRepository from '../repositories/CategoriesRepository'
import { CategoryGETResponse } from '../types/Category'

export default new class CategoryController {
  async index (req: Request, res: Response) {
    try {
      const categoriesRepository = getCustomRepository(CategoriesRepository)
      const responseBody: CategoryGETResponse = {
        message: '',
        body: []
      }
      let statusCode = 200

      if (!req.params.id) {
        const category = await categoriesRepository.findAll()
        if (!category) {
          responseBody.message = 'Não há categorias cadastradas'
          statusCode = 404
        } else {
          responseBody.message = 'Sucesso'
          responseBody.body = category
        }
      } else {
        const categories = await categoriesRepository.findSingle(req.params.id)
        if (!categories) {
          responseBody.message += 'Não foi possível encontrar a categoria selecionada'
          statusCode = 404
        } else {
          responseBody.message = 'Sucesso'
          responseBody.body?.push(categories)
        }
      }
      return res.status(statusCode).json(responseBody)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error })
    }
  }

  async create (req: Request, res: Response) {
    try {
      const categoriesRepository = getCustomRepository(CategoriesRepository)
      const categoryCreated = await categoriesRepository.createCategory(req.body)

      return res.status(200).json(categoryCreated)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error })
    }
  }

  async update (req: Request, res: Response) {
    try {
      const data = {}

      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error })
    }
  }

  async delete (req: Request, res: Response) {
    try {
      const data = {}

      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error })
    }
  }
}()
