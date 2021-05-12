import { EntityRepository, Repository } from 'typeorm'
import TransactionsModel from '../models/TransactionsModel'

@EntityRepository(TransactionsModel)
export default class TransactionsRepository extends Repository<TransactionsModel> {}
