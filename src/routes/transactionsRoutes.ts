import { Router } from 'express'
import TransactionsControllers from '../controllers/TransactionsControllers'

const transactionsRoutes = Router()

transactionsRoutes.get('/:userId', TransactionsControllers.index)

transactionsRoutes.get('/:userId/:transactionId', TransactionsControllers.show)

transactionsRoutes.post('/', TransactionsControllers.create)

transactionsRoutes.put('/:userId/:transactionId', TransactionsControllers.update)

transactionsRoutes.delete('/:userId/:transactionId', TransactionsControllers.delete)

export default transactionsRoutes
