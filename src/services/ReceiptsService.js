const db = require('../helpers/database')

const create = async(data) =>{
    return await db.insertIntoTable("expenses", data)
}

const edit = async(data) =>{

}

const list = async({data, single}) =>{
    if(single){
        const params = `where id = ${data.id}`
        return await db.findSpecificRow({ table: "expenses", params})
    }else{
        
    }
}

const del = async(data) =>{

}

module.exports = {
    create,
    edit,
    list,
    del
}