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
        const categories = await categoriesRepository.findById(req.params.id)
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
      if (!req.params.idUser || !req.params.idCategory) {
        return res.status(422).json({ message: 'Invalid params' })
      }
      const categoriesRepository = getCustomRepository(CategoriesRepository)
      const categoryUpdated: any = await categoriesRepository.updateCategory({
        idUser: req.params.idUser,
        idCategory: req.params.idCategory,
        name: req.body.name,
        state: req.body.state,
        type: req.body.type
      })
      if (categoryUpdated.raw.affectedRows < 1) {
        return res.status(404).json({ message: 'Não foi possível editar a categoria' })
      }
      return res.status(200).json({ message: 'Sucesso' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error })
    }
  }

  async delete (req: Request, res: Response) {
    try {
      if (!req.params.idUser || !req.params.idCategory) {
        return res.status(422).json({ message: 'Invalid params' })
      }
      const categoriesRepository = getCustomRepository(CategoriesRepository)
      const categoryDeleted = await categoriesRepository.deleteCategory(req.params.idCategory)
      if (categoryDeleted.raw.affectedRows < 1) {
        return res.status(404).json({ message: 'Não foi possível deletar a categoria' })
      }
      return res.status(200).json({ message: 'Sucesso' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error })
    }
  }
}()
