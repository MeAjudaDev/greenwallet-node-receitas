import moment from 'moment'
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

  async show (req: Request, resp: Response) {
    try {
      const { userId, transactionId } = req.params
      const transactionsRepository = getCustomRepository(TransactionsRepository)
      const searchTransaction = await transactionsRepository.findOne({ user_id: userId, id: transactionId })

      if (!searchTransaction) {
        return resp.status(404).json({ message: 'transaction not found' })
      }

      return resp.status(200).json({ message: 'success', body: [searchTransaction] })
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: error })
    }
  }

  async create (req: Request, resp: Response) {
    try {
      const transactionsRepository = getCustomRepository(TransactionsRepository)
      const transaction = await transactionsRepository.save(req.body)

      return resp.status(201).json({ message: 'success', body: [transaction] })
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: error })
    }
  }

  async update (req: Request, resp: Response) {
    try {
      const { userId, transactionId } = req.params
      const { description, value, state, type, due_date: dueDate, is_fixed: isFixed } = req.body
      const transactionsRepository = getCustomRepository(TransactionsRepository)
      const searchTransaction = await transactionsRepository.findOne({ user_id: userId, id: transactionId })

      if (!searchTransaction) {
        return resp.status(404).json({ message: 'transaction not found' })
      }

      const data = {
        user_id: userId,
        category_id: transactionId,
        description: description,
        value: value,
        due_Date: moment(dueDate, 'DD/MM/YYYY').format('YYYY/MM/DD'),
        isFixed: isFixed,
        state: state,
        type: type
      }

      await transactionsRepository.update({ user_id: userId, id: transactionId }, {
        category_id: data.category_id,
        description: data.description,
        is_fixed: data.isFixed,
        due_date: data.due_Date,
        state: data.state,
        type: data.type,
        value: data.value
      })

      return resp.status(200).json({ message: 'success', body: [data] })
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: error })
    }
  }

  async delete (req: Request, resp: Response) {
    try {
      const { userId, transactionId } = req.params
      const transactionsRepository = getCustomRepository(TransactionsRepository)
      const searchTransaction = await transactionsRepository.findOne({ user_id: userId, id: transactionId })

      if (!searchTransaction) {
        return resp.status(404).json({ message: 'transaction not found' })
      }

      await transactionsRepository.delete({ user_id: userId, id: transactionId })

      return resp.status(200).json({ message: 'success' })
    } catch (error) {
      console.log(error)
      return resp.status(500).json({ message: error })
    }
  }
}()
