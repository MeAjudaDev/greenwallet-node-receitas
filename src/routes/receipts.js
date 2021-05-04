const express = require('express')
const router = express.Router()
const ReceiptsController = require('../controllers/receipts')
const { ValidatorMiddleware } = require("../validators/ReceiptValidator")

router.use(ValidatorMiddleware)
router.post('/create', ReceiptsController.createReceipt)
router.put('/edit', ReceiptsController.editReceipt)
router.get('/list/single/:id', ReceiptsController.getSingleReceipt)
router.get('/list/many', ReceiptsController.getMultipleReceipts)
router.delete('/delete/:id', ReceiptsController.deleteReceipt)


module.exports = router
