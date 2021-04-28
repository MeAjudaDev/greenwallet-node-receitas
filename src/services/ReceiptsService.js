const db = require('../helpers/database')

const create = async(data) =>{
    return await db.insertIntoTable("expenses", data)
}

const edit = async(data) =>{

}

const list = async(data) =>{

}

const del = async(data) =>{

}

module.exports = {
    create,
    edit,
    list,
    del
}