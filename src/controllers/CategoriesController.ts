import { Request, response, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import CategoriesRepository from '../repositories/CategoriesRepository'

export default new class CategoryController {
  async index (req: Request, res: Response) {
    try {
      const { userid } = req.params
      const categoriesRepository = getCustomRepository(CategoriesRepository)
      const responseBody: any = {
        message: '',
        body: []
      }

      const category = await categoriesRepository.findAll({ userid })
      responseBody.message = 'Sucesso'
      responseBody.body = category
      if (category.length < 1) {
        responseBody.message = 'O usuário não possui categorias cadastradas'
        return res.status(404).json(responseBody)
      }
      return res.status(200).json(responseBody)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: error })
    }
  }

  async show (req: Request, res: Response) {
    try {
      const { userid, idCategory } = req.params
      const responseBody: any = {
        message: '',
        body: []
      }

      const categoriesRepository = getCustomRepository(CategoriesRepository)
      const category = await categoriesRepository.findByIdAndUserId({ userid, idCategory })

      responseBody.message = 'Sucesso'
      responseBody.body.push(category)
      if (!category) {
        responseBody.message = 'Não foi possível encontrar a categoria selecionada'
        delete responseBody.body
        return res.status(404).json(responseBody)
      }

      return res.status(200).json(responseBody)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: error.message })
    }
  }

  async create (req: Request, res: Response) {
    try {
      const categoriesRepository = getCustomRepository(CategoriesRepository)
      const categoryCreated = await categoriesRepository.createCategory(req.body)
      
      return res.status(200).json({message: 'Success', body:categoryCreated})
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: error.message })
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
      console.error(error)
      return res.status(500).json({ message: error.message })
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
      console.error(error)
      return res.status(500).json({ message: error.message })
    }
  }
}()
