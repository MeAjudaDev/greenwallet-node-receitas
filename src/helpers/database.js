const connectDB = require('../database/connect');

const selectAll = async({table}) =>{
    const conn = await connectDB();
    const [rows] = await conn.query(`SELECT * FROM ${table}`)
    return rows
}

const findSpecificRow = async({ table, params }) =>{
    console.log(params)
    const conn = await connectDB();
    const [rows] = await conn.query(`SELECT * FROM ${table} ${params}`)
    return rows
}

module.exports = {
    selectAll,
    findSpecificRow
}