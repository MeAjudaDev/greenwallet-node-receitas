import { Router } from 'express'
import TransactionsControllers from '../controllers/TransactionsControllers'
import validate from '../validators/TransactionsValidators'

const transactionsRoutes = Router()
transactionsRoutes
  .get('/user/:user_id',
    validate.indexTransaction(),
    validate.verifyErrosTransaction,
    TransactionsControllers.index
  )

transactionsRoutes
.get('/user/:user_id',
  validate.indexTransaction(),
  validate.verifyErrosTransaction,
  TransactionsControllers.index
)

transactionsRoutes
  .get('/user/:user_id/export',
    validate.exportTransactions(),
    validate.verifyErrosTransaction,
    TransactionsControllers.export
  )

transactionsRoutes
  .post('/',
    validate.storeTransaction(),
    validate.verifyErrosTransaction,
    TransactionsControllers.create
  )

transactionsRoutes
  .put('/user/:user_id/transaction/:transaction_id',
    validate.updateTransaction(),
    validate.verifyErrosTransaction,
    TransactionsControllers.update
  )

transactionsRoutes
  .delete('/user/:user_id/transaction/:transaction_id',
    validate.deleteTransaction(),
    validate.verifyErrosTransaction,
    TransactionsControllers.delete
  )

export default transactionsRoutes
