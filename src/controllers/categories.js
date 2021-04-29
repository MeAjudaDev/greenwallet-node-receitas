const db = require('../helpers/database')
const { createCategoryServices, deleteCategoryServices, updateCategoryServices } = require('../services/CategoriesServices')

const findAllCategories = async () => {
  return await db.selectAll({table: 'categories'})
}

const findById = async (id) => {
  const params = `where id = ${id}`
  return await db.findSpecificRow({ table: 'categories', params })
}

const createCategory = async(req, res) => {
  try {
    const { id } = req.params;
    const { name, state, type } = req.body;

    const create = await createCategoryServices(id, name, state, type)

    if(create.err){
      return res.status(422).json({ message: create.err })
    }

    if(create.errData){
      return res.status(400).json({ message: create.errData })
    }

    return res.status(201).json({ message: "Request done" })

  } catch (error) {
    return res.status(500).json({ err: error })
  }
}

const updateCategory = async(req, res) => {
  try {
    const { id } = req.params;
    const { idCategory, name, state, type } = req.body;

    const update = await updateCategoryServices(id, idCategory, name, state, type)

    if(update.err){
      return res.status(404).json({ message: update.err })
    }

    if(update.errData){
      return res.status(422).json({ message: update.errData })
    }

    return res.status(200).json({ message: "Request done"})

  } catch (error) {
    console.log(error)
    return res.status(500).json({ err: error })
  }
}

const deleteCategory = async(req, res) => {  
  try {
    const { id } = req.params;
    const { category } = req.body;
  
    const del = await deleteCategoryServices(category, id)

    if(del.err){
      return res.status(422).json({ message: del.err })
    }

    if(del.errNotFound){
      return res.status(404).json({ message: del.errNotFound })
    }
    
    return res.status(200).json({ message: "Request done" })
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}


module.exports = {
  findAllCategories,
  findById,
  createCategory,
  updateCategory,
  deleteCategory
}