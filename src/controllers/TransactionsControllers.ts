/* eslint-disable camelcase */
import { parse, format, subDays, formatDistance } from 'date-fns'
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import TransactionsRepository from '../repositories/TransactionsRepository'

export default new class TransactionsController {
  async index (req: Request, resp: Response) {
    try {
      const { user_id } = req.params
      const data = await getCustomRepository(TransactionsRepository).find({
        where: { user_id }
      })

      return resp.status(200).json(data)
    } catch (error) {
      console.error(error)
      return resp.status(500).json({ message: error })
    }
  }

  async show (req: Request, resp: Response) {
    try {
      const { user_id, transaction_id } = req.params
      const transactionsRepository = getCustomRepository(TransactionsRepository)
      const searchTransaction = await transactionsRepository.findOne({ user_id, id: transaction_id })

      if(req.query.date_begin && req.query.date_end){
        const { date_begin, date_end } = req.query
        const dateBeginParse = format(parse(String(date_begin), "dd/MM/yyyy", new Date()), "yyyy/MM/dd")
        const dateEndParse = format(parse(String(date_end), "dd/MM/yyyy", new Date()), "yyyy/MM/dd")
        
        const searchRangeDate = await transactionsRepository
          .query(`SELECT * FROM transactions WHERE due_date BETWEEN '${dateBeginParse}' AND '${dateEndParse}' ORDER BY due_date`)

        return resp.status(200).json(searchRangeDate)
      }

      if(req.query.range){
        const allow_range = [7, 15, 30, 60, 90]
        const range = Number(req.query.range)
        const date_today = format(new Date(), "yyyy/MM/dd")
        const date_old = format(subDays(new Date(), Number(range)), "yyyy/MM/dd")

        if(!allow_range.includes(range)){
          return resp.status(422).json({ message: "invalid range" })
        }

        const searchRangeDate = await transactionsRepository
          .query(`SELECT * FROM transactions WHERE due_date BETWEEN '${date_old}' AND '${date_today}' ORDER BY due_date`)

          return resp.status(200).json(searchRangeDate)
      }

      if (!searchTransaction) {
        return resp.status(404).json({ message: 'transaction not found' })
      }

      return resp.status(200).json({ message: 'success', body: [searchTransaction] })
    } catch (error) {
      console.error(error)
      return resp.status(500).json({ message: error })
    }
  }

  async create (req: Request, resp: Response) {
    try {
      const transactionsRepository = getCustomRepository(TransactionsRepository)
      const date_parse = parse(req.body.due_date, "dd/MM/yyyy", new Date())

      const transaction = await transactionsRepository
      .save({
        ...req.body,
        due_date: date_parse,
      })
      .catch(erro => {
          const { errno: errorForeignKeyCode } = erro
          return { message: errorForeignKeyCode }
        })  

      if (transaction.message) {
        return resp.status(422).json({ message: 'category not found' })
      }   
 
      return resp.status(201).json({ message: 'success', body: [transaction] })
    } catch (error) {
      console.error(error)
      return resp.status(500).json({ message: error })
    }
  }

  async update (req: Request, resp: Response) {
    try {
      const { user_id, transaction_id } = req.params
      const { description, category_id, value, state, type, due_date: dueDate, is_fixed: isFixed } = req.body
      const transactionsRepository = getCustomRepository(TransactionsRepository)
      const searchTransaction = await transactionsRepository.findOne({ user_id, id: transaction_id })

      if (!searchTransaction) {
        return resp.status(404).json({ message: 'transaction not found' })
      }

      const data = {
        user_id: user_id,
        category_id: category_id,
        description: description,
        value: value,
        due_Date: format(parse(dueDate, 'dd/MM/yyyy', new Date()), 'yyyy/MM/dd'),
        isFixed: isFixed,
        state: state,
        type: type
      }

      try {
        await transactionsRepository.update({ user_id, id: transaction_id }, {
          category_id: data.category_id,
          description: data.description,
          is_fixed: data.isFixed,
          due_date: data.due_Date,
          state: data.state,
          type: data.type,
          value: data.value
        })
      } catch (error) {
        return resp.status(404).json({ message: "category not found" })
      }

      return resp.status(200).json({ message: 'success', body: [data] })
    } catch (error) {
      console.error(error)
      return resp.status(500).json({ message: error })
    }
  }

  async delete (req: Request, resp: Response) {
    try {
      const { user_id, transaction_id } = req.params
      const transactionsRepository = getCustomRepository(TransactionsRepository)
      const searchTransaction = await transactionsRepository.findOne({ user_id, id: transaction_id })

      if (!searchTransaction) {
        return resp.status(404).json({ message: 'transaction not found' })
      }

      await transactionsRepository.delete({ user_id, id: transaction_id })

      return resp.status(200).json({ message: 'success' })
    } catch (error) {
      console.error(error)
      return resp.status(500).json({ message: error })
    }
  }
}()
