const express = require('express')
const router = express.Router()
const { getAllCategories } = require('../controllers/categories')

router.get('/', async (req, res, next) => {
  const categories = await getAllCategories()

  return res.status(200).json({ msg: true, data: categories })
})

module.exports = router