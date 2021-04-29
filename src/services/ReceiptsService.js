const db = require('../helpers/database')

const create = async(data) =>{
    return await db.insertIntoTable("expenses", data)
}

const edit = async(data) =>{
    const { id, description, value, is_fixed, due_date, user_id, category_id } = data;

    const queryparam = `description="${description}", value=${value}, is_fixed=${is_fixed}, due_date="${due_date}", category_id=${category_id} WHERE id=${id} and user_id=${user_id}`
    return await db.updateItemTable({ table: "expenses", params: queryparam })
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

const del = async({ id }) =>{
    const queryParam = `where id=${id}`
    return await db.deleteItemTable({ table: "expenses", params: queryParam})
}

module.exports = {
    create,
    edit,
    list,
    del
}