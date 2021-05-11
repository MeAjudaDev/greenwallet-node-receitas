const db = require("../helpers/database")
const { ValidationCategories, ValidationNameAllowed } = require("../validators/categoriesValidations")

const createCategoryServices = async (id, name, state, type) => {

    const searchCategory = await db.findSpecificRow({ table: "categories", params: `where user_id=${id} and name="${name}"`})
    const validateCategory = ValidationCategories(name, state, type)

    if(searchCategory.length !== 0){
        return { message: "category already create" }
    }

    if(validateCategory){
        return {
             message: { 
                 message: `Have ${validateCategory.length} erros`, 
                 erros: validateCategory
                }
        }
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
    const validateCategory = ValidationCategories(name, state, type)
    const verifyNameallowed = await ValidationNameAllowed(idUser, idCategory, name)

    if(searchCategory.length === 0){
        return { message: "category not found" }
    }

    if(validateCategory.message){
        return { message: validateCategory.message }
    }
    
    if(verifyNameallowed.message){
        return { message: verifyNameallowed.message }
    }
    
    await db.updateItemTable({ table: "categories", params: `name="${name}", state="${state}", type="${type}" WHERE user_id=${idUser} and id=${idCategory}` })

    return { message: "" }
}

const deleteCategoryServices = async (idUser, idCategory) => {
    
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