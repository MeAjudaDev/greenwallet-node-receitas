import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import TransactionsRepository from '../repositories/TransactionsRepository'

export default new class TransactionsController {
  async index (req: Request, resp: Response) {
    try {
      const data = await getCustomRepository(TransactionsRepository).find()

      return resp.status(200).json(data)
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: error })
    }
  }
}()
