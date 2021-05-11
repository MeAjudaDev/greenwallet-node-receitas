const db = require("../helpers/database")

function ValidationCategories(name, state, type){

    const stateAllowed = ["A", "D", "E"]
    const typesAllowed = ["E", "R"]

    const erros = []

    if(name.length > 100){
        erros.push({
            path: "name",
            message: "allowed limit up to 100 characters in name"
        })
    }

    if(!stateAllowed.includes(state)){
        erros.push({
            path: "state", 
            message: "Invalid params in state" 
        })
    }

    if(!typesAllowed.includes(type)){
        erros.push({ 
            path: "type",
            message: "Invalid params in type" 
        })
    }

    return erros
}

async function ValidationNameAllowed (idUser, idCategory, name){
    const verifyNameallowed = await db.findSpecificRow({ table: "categories", params: `where user_id=${idUser} and id !=${idCategory}` })

    const verifyName = verifyNameallowed.filter(result => {
        if(result.name === name){
            return result
        }

        return 0
    }) 

    if(verifyName.length !== 0){
        return { message: "name already used" }
    }

    return { message: "" }
}

module.exports = {
    ValidationNameAllowed,
    ValidationCategories
}