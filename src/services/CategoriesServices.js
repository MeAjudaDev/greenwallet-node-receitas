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

const updateCategoryServices = async (idUser, idCategory, name, state, type) => {
    const searchCategory = await db.findSpecificRow({ table: "categories", params: `where user_id=${idUser} and id="${idCategory}"`})

    if(searchCategory.length === 0){
        return { err: "category not found" }
    }

    if(state !== "A" && state !== "D" && state !== "E"){
        return { errData : "Invalid params in state"}
    }

    if(type !== "R" && type !== "D"){
        return { errData: "Invalid params in type" }
    }
    
    await db.updateItemTable({ table: "categories", params: `name="${name}", state="${state}", type="${type}" WHERE user_id=${idUser} and id=${idCategory}` })

    return { msg: "update" }
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
    deleteCategoryServices,
    updateCategoryServices
}