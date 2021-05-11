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
    const { idUser } = req.params;
    const { name, state, type } = req.body;

    const create = await createCategoryServices(idUser, name, state, type)

    if(create.message === "category already create"){
      return res.status(400).json({ message: create.message })
    }

    if(create.message !== "Sucesso"){
      return res.status(422).json(create.message)
    }

    return res.status(201).json(create)

  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

const updateCategory = async(req, res) => {
  try {
    const { idUser, idCategory } = req.params;
    const { name, state, type } = req.body;

    const update = await updateCategoryServices(idUser, idCategory, name, state, type)

    if(update.message === "category not found"){
      return res.status(404).json({ message: update.message })
    }

    if(update.message){
      return res.status(422).json({ message: update.message })
    }

    return res.status(200).json({ message: "Sucesso"})

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const deleteCategory = async(req, res) => {  
  try {
    const { idUser, idCategory } = req.params;
    const del = await deleteCategoryServices(idUser, idCategory)

    if(del.message){
      return res.status(404).json({ message: del.message })
    }
    
    return res.status(200).json({ message: "Deletado com sucesso" })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}


module.exports = {
  findAllCategories,
  findById,
  createCategory,
  updateCategory,
  deleteCategory
}