const db = require("../helpers/database")

const createCategoryServices = async (id, name, state, type) => {
    if(!name || !state || !type){
        return { err: 'Invalid params!' };
    }

    const searchCategory = await db.findSpecificRow({ table: "categories", params: `where user_id=${id} and name="${name}"`})

    if(searchCategory.length !== 0){
        return { errAlreadyCreate: "category already create" }
    }

    await db.insertIntoTable("categories", {
        user_id: id,
        name,
        state, 
        type,
        update_at: new Date()
    }) 

    return { msg: "create" }
}

const deleteCategoryServices = async (category, idUser) => {
    if(!category || !idUser){
        return { err: "Invalid params!" }
    }

    const searchData = await db.findSpecificRow({ table: "categories", params: `where user_id=${idUser} and name="${category}"`})

    if(searchData.length === 0){
        return { errNotFound: "user or category not found" }
    }

    await db.deleteItemTable({ table: "categories", params: `WHERE user_id=${idUser} and name="${category}"` })

    return { msg: "Delete" }
}


module.exports = {
    createCategoryServices,
    deleteCategoryServices
}