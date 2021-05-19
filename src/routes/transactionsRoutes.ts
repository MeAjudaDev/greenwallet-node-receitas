import { Router } from 'express'
import TransactionsControllers from '../controllers/TransactionsControllers'
import validate from '../validators/TransactionsValidators'

const transactionsRoutes = Router()

transactionsRoutes
  .get('/:userId',
    validate.indexTransaction(),
    validate.verifyErrosTransaction,
    TransactionsControllers.index
  )

transactionsRoutes
  .get('/:userId/:transactionId',
    validate.showTransaction(),
    validate.verifyErrosTransaction,
    TransactionsControllers.show
  )

transactionsRoutes
  .post('/',
    validate.storeTransaction(),
    validate.verifyErrosTransaction,
    TransactionsControllers.create
  )

transactionsRoutes
  .put('/:userId/:transactionId',
    validate.updateTransaction(),
    validate.verifyErrosTransaction,
    TransactionsControllers.update
  )

transactionsRoutes
  .delete('/:userId/:transactionId',
    validate.deleteTransaction(),
    validate.verifyErrosTransaction,
    TransactionsControllers.delete
  )

export default transactionsRoutes
