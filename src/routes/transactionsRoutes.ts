import { Router } from 'express'
import TransactionsControllers from '../controllers/TransactionsControllers'

const transactionsRoutes = Router()

transactionsRoutes.get('/recipes', TransactionsControllers.index)

export default transactionsRoutes
