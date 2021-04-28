const connectDB = require('../database/connect')

const selectAll = async ({ table }) => {
  const conn = await connectDB()
  const [rows] = await conn.query(`SELECT * FROM ${table}`)
  return rows
}

const findSpecificRow = async ({ table, params }) => {
  console.log(params)
  const conn = await connectDB()
  const [rows] = await conn.query(`SELECT * FROM ${table} ${params}`)
  return rows
}

const insertIntoTable = async ( table, values ) =>{
  const conn = await connectDB()
  let query = `INSERT INTO `
  let vals;
  switch (table) {
    case "expenses":{
      query += `expenses(description, value, is_fixed, due_date, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`
      vals = [values.description, values.value, values.is_fixed, values.due_date, values.category_id, values.user_id]
    }
  }
  const res = await conn.query(query, vals)
  if(res[0]){
    return 200
  }else{
    return 400
  }
}

module.exports = {
  selectAll,
  findSpecificRow,
  insertIntoTable
}
