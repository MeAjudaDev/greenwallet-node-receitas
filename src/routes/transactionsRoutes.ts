import { Router } from 'express'
import TransactionsControllers from '../controllers/TransactionsControllers'
import validate from '../validators/TransactionsValidators'
import { userExists } from '../middlewares/User'

const transactionsRoutes = Router()
transactionsRoutes
  .get('/user/:user_id',
    validate.indexTransaction(),
    validate.verifyErrosTransaction,
    userExists,
    TransactionsControllers.index
  )

transactionsRoutes
  .get('/user/:user_id/transaction/:transaction_id',
    validate.showTransaction(),
    validate.verifyErrosTransaction,
    userExists,
    TransactionsControllers.show
  )

transactionsRoutes
.get('/user/:user_id',
  validate.indexTransaction(),
  validate.verifyErrosTransaction,
  userExists,
  TransactionsControllers.index
)

transactionsRoutes
  .get('/user/:user_id/export',
    validate.exportTransactions(),
    validate.verifyErrosTransaction,
    userExists,
    TransactionsControllers.export
  )

transactionsRoutes
  .post('/',
    validate.storeTransaction(),
    validate.verifyErrosTransaction,
    userExists,
    TransactionsControllers.create
  )

transactionsRoutes
  .put('/user/:user_id/transaction/:transaction_id',
    validate.updateTransaction(),
    validate.verifyErrosTransaction,
    userExists,
    TransactionsControllers.update
  )

transactionsRoutes
  .delete('/user/:user_id/transaction/:transaction_id',
    validate.deleteTransaction(),
    validate.verifyErrosTransaction,
    userExists,
    TransactionsControllers.delete
  )

export default transactionsRoutes
