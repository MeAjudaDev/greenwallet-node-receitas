const db = require('../helpers/database')

const create = async(data) =>{
    return await db.insertIntoTable("expenses", data)
}

const edit = async(data) =>{

}

const list = async({data, single}) =>{
    if(single){
        const params = `where id=${data.id}`
        return await db.findSpecificRow({ table: "expenses", params})
    }else{
        let params = `where user_id=${data.user_id}`
        if(data.start_date && data.end_date){
            params = params.concat(` AND due_date >= '${data.start_date}' AND due_date < '${data.end_date}'`)
        }
        if(data.category){
            params = params.concat(` AND category_id IN (${data.category.split(',')})`)
        }
        return await db.selectAll({table: `expenses ${params}`}) 
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