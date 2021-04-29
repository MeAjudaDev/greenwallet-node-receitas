const express = require('express')
const router = express.Router()
const { findAllCategories, findById, createCategory, deleteCategory } = require('../controllers/categories')

router.get('/', async (req, res, next) => {
  const categories = await findAllCategories()

  if (categories.length < 1) {
    return res.status(404).json({ message: 'Não há categorias cadastradas' })
  }

  return res.status(200).json({ msg: true, data: categories })
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const categories = await findById(id)

  if (categories.length < 1) {
    return res
      .status(404)
      .json({ message: 'Não foi possivel encontrar a categoria selecionada' })
  }

  return res.status(200).json({ message: 'success', body: categories })
})

router.post("/:id", createCategory)

router.delete("/:id", deleteCategory)

module.exports = router
