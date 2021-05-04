const db = require("../helpers/database")

const createCategoryServices = async (id, name, state, type) => {
    if(!name || !state || !type){
        return { message: 'Invalid params!' };
    }

    const searchCategory = await db.findSpecificRow({ table: "categories", params: `where user_id=${id} and name="${name}"`})

    if(searchCategory.length !== 0){
        return { message: "category already create" }
    }

    if(state !== "A" && state !== "D" && state !== "E"){
        return { message : "Invalid params in state"}
    }

    if(type !== "E" && type !== "R"){
        return { message: "Invalid params in type" }
    }

    const product = {
        user_id: id,
        name: name,
        state: state,
        type: type
    }

    await db.insertIntoTable("categories", {
        user_id: product.user_id,
        name: product.name,
        state: product.state, 
        type: product.type
    })

    return { body: [product], message: "Sucesso" }
}

const updateCategoryServices = async (idUser, idCategory, name, state, type) => {
    const searchCategory = await db.findSpecificRow({ table: "categories", params: `where user_id=${idUser} and id="${idCategory}"`})

    if(searchCategory.length === 0){
        return { message: "category not found" }
    }

    if(state !== "A" && state !== "D" && state !== "E"){
        return { message : "Invalid params in state"}
    }

    if(type !== "E" && type !== "R"){
        return { message: "Invalid params in type" }
    }
    
    await db.updateItemTable({ table: "categories", params: `name="${name}", state="${state}", type="${type}" WHERE user_id=${idUser} and id=${idCategory}` })

    return { message: "" }
}

const deleteCategoryServices = async (idUser, idCategory) => {
    if(!idCategory || !idUser){
        return { message: "Invalid params!" }
    }

    const searchData = await db.findSpecificRow({ table: "categories", params: `where user_id=${idUser} and id="${idCategory}"`})

    if(searchData.length === 0){
        return { message: "user or category not found" }
    }

    await db.deleteItemTable({ table: "categories", params: `WHERE user_id=${idUser} and id="${idCategory}"` })

    return { message: "" }
}


module.exports = {
    createCategoryServices,
    deleteCategoryServices,
    updateCategoryServices
}