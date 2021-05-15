import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import CategoriesRepository from '../repositories/CategoriesRepository'

export default new class CategoryController {
  async index (req: Request, resp: Response) {
    try {
      const data = await getCustomRepository(CategoriesRepository).find()

      return resp.status(200).json(data)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: error })
    }
  }

  async create (req: Request, res: Response) {
    try {
      const data = await getCustomRepository(CategoriesRepository).find()

      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error })
    }
  }

  async update (req: Request, res: Response) {
    try {
      const data = await getCustomRepository(CategoriesRepository).find()

      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error })
    }
  }

  async delete (req: Request, res: Response) {
    try {
      const data = await getCustomRepository(CategoriesRepository).find()

      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error })
    }
  }
}()
