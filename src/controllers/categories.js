const db = require('../helpers/database')

const getAllCategories = async () => {
  return await db.selectAll({table: 'categories'})
}

module.exports = {
  getAllCategories
}