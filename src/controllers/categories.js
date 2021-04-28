const db = require('../helpers/database')

const findAllCategories = async () => {
  return await db.selectAll({table: 'categories'})
}

const findById = async (id) => {
  params = `where id = ${id}`
  return await db.findSpecificRow({ table: 'categories', params })
}

module.exports = {
  findAllCategories,
  findById
}