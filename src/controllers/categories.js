const connectDB = require('../database/connect');

const getAllCategories = async () => {
  return await connectDB().promise().query("SELECT * from categories")
    .then( ([rows,fields]) => {
      console.log(rows);
      return rows
    })
    .catch(console.log)
    .then( () => connectDB().end());
}

module.exports = {
  getAllCategories
}