const connectDB = require('../database/connect');

const selectAll = async({table}) =>{
    const conn = await connectDB();
    const [rows] = await conn.query(`SELECT * FROM ${table}`)
    return rows
}

module.exports = {
    selectAll
}