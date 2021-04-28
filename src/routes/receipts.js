const express = require('express')
const router = express.Router()
const ReceiptsController = require('../controllers/receipts')

router.post('/create', ReceiptsController.createReceipt)
router.put('/edit', ReceiptsController.editReceipt)
router.get('/:id?', ReceiptsController.getReceipts)
router.delete('/delete/:id', ReceiptsController.deleteReceipt)

module.exports = router
