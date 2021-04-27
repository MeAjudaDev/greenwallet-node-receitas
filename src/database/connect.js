const mysql = require("mysql2")
 
const connectDB = () =>  mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

module.exports = connectDB