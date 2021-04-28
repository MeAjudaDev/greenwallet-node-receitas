const mysql = require("mysql2/promise")

const connectDB = async() =>{
    if(global.connection && global.connection.state !== "disconnected") return global.connection;

    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD
    })
    console.log('Conectado ao MySQL')
    global.connection = connection
    return connection
}

module.exports = connectDB